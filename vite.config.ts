import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const base = isProd ? '/gambia-flyaway-apartments/' : '/';
  
  // For GitHub Pages
  if (isProd) {
    process.env.NODE_ENV = 'production';
    process.env.BASE_URL = base;
  }
  
  return {
    base: '/gambia-flyaway-apartments/',
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: !isProd,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
          entryFileNames: 'assets/js/[name].[hash].js',
          chunkFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: 'assets/[ext]/[name].[hash][extname]',
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      'import.meta.env.BASE_URL': JSON.stringify(base),
    },
  };
});
