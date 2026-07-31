import fs from 'fs';
import path from 'path';
import https from 'https';

const images = [
  {
    name: 'pristine-beaches.jpg',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80'
  },
  {
    name: 'natural-parks.jpg',
    url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop&q=80'
  },
  {
    name: 'local-cuisine.jpg',
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop&q=80'
  },
  {
    name: 'cultural-scenery.jpg',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80'
  }
];

const targetDir = path.join(process.cwd(), 'public', 'images', 'attractions');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function main() {
  for (const img of images) {
    const dest = path.join(targetDir, img.name);
    console.log(`Downloading ${img.name}...`);
    await download(img.url, dest);
    console.log(`Saved ${img.name}`);
  }
  console.log('All attraction images downloaded successfully!');
}

main().catch(console.error);
