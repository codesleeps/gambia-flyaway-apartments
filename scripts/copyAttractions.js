import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const pubAttractions = path.join(rootDir, 'public', 'images', 'attractions');
const distAttractions = path.join(rootDir, 'dist', 'images', 'attractions');

if (!fs.existsSync(pubAttractions)) {
  fs.mkdirSync(pubAttractions, { recursive: true });
}
if (!fs.existsSync(distAttractions)) {
  fs.mkdirSync(distAttractions, { recursive: true });
}

const fileMap = {
  'beach_attraction_1785676012086.png': ['beach.png', 'beach_attraction_1785676012086.png'],
  'park_attraction_1785676039082.png': ['park.png', 'park_attraction_1785676039082.png'],
  'cuisine_attraction_1785676057685.png': ['cuisine.png', 'cuisine_attraction_1785676057685.png'],
  'culture_attraction_1785676069923.png': ['culture.png', 'culture_attraction_1785676069923.png'],
};

for (const [srcName, targets] of Object.entries(fileMap)) {
  const srcPath = path.join(pubAttractions, srcName);
  if (fs.existsSync(srcPath)) {
    for (const targetName of targets) {
      fs.copyFileSync(srcPath, path.join(pubAttractions, targetName));
      fs.copyFileSync(srcPath, path.join(distAttractions, targetName));
      console.log(`Copied ${srcName} -> ${targetName} in public & dist`);
    }
  } else {
    console.warn(`Warning: ${srcPath} does not exist!`);
  }
}
