import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const attractionsDir = path.resolve(__dirname, '../public/images/attractions');

const copies = [
  ['beach_attraction_1785676012086.png', 'beach.png'],
  ['beach_attraction_1785676012086.png', 'pristine-beaches.jpg'],
  ['park_attraction_1785676039082.png', 'park.png'],
  ['park_attraction_1785676039082.png', 'natural-parks.jpg'],
  ['cuisine_attraction_1785676057685.png', 'cuisine.png'],
  ['cuisine_attraction_1785676057685.png', 'local-cuisine.jpg'],
  ['culture_attraction_1785676069923.png', 'culture.png'],
  ['culture_attraction_1785676069923.png', 'cultural-scenery.jpg'],
];

for (const [srcName, destName] of copies) {
  const src = path.join(attractionsDir, srcName);
  const dest = path.join(attractionsDir, destName);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${srcName} to ${destName}`);
  }
}
