import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const pub = path.join(root, "public");

async function variants(srcName, destBase, widths) {
  const src = path.join(pub, srcName);
  for (const width of widths) {
    const img = sharp(src).rotate().resize({ width, withoutEnlargement: true });
    await img
      .clone()
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(pub, `${destBase}-${width}.webp`));
    await img
      .clone()
      .jpeg({ quality: 84, mozjpeg: true, progressive: true })
      .toFile(path.join(pub, `${destBase}-${width}.jpg`));
  }
}

async function noiseTile() {
  const size = 128;
  const buf = Buffer.alloc(size * size);
  for (let i = 0; i < buf.length; i++) {
    buf[i] = Math.floor(Math.random() * 256);
  }
  await sharp(buf, { raw: { width: size, height: size, channels: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(pub, "noise.png"));
}

await variants("terka.jpg", "terka", [640, 960, 1280]);
await variants("terka-kreslo.jpg", "terka-kreslo", [640, 960, 1280]);
await variants("workshop-praha.jpg", "workshop-praha", [800, 1280, 1920]);
await noiseTile();

console.log("Optimized image variants written to public/");
