import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const pubAttractions = path.join(rootDir, 'public', 'images', 'attractions');
const distAttractions = path.join(rootDir, 'dist', 'images', 'attractions');

// Ensure directories exist
fs.mkdirSync(pubAttractions, { recursive: true });
fs.mkdirSync(distAttractions, { recursive: true });

const files = fs.readdirSync(pubAttractions);
console.log('Files in public/images/attractions:', files);

for (const file of files) {
  if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webp') || file.endsWith('.svg')) {
    const src = path.join(pubAttractions, file);
    const dest = path.join(distAttractions, file);
    fs.copyFileSync(src, dest);
    console.log(`Successfully synced ${file} -> dist/images/attractions/${file}`);
  }
}
