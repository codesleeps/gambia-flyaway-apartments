import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/gambia-flyaway-apartments/", // Set base to repo name for GitHub Pages
  plugins: [react()],
});
