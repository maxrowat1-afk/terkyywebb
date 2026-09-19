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

await variants("terka.jpg", "terka", [640, 960, 1280]);
await variants("terka-kreslo.jpg", "terka-kreslo", [640, 960, 1280]);
await variants("workshop-praha.jpg", "workshop-praha", [800, 1280, 1920]);

console.log("Optimized image variants written to public/");
