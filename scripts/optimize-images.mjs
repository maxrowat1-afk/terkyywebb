import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "assets/source");
const pub = path.join(root, "public");

async function variants(srcName, destBase, widths) {
  const src = path.join(srcDir, srcName);
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

async function ogShare(srcName, destName) {
  await sharp(path.join(srcDir, srcName))
    .rotate()
    .resize(1200, 630, { fit: "cover", position: "north" })
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toFile(path.join(pub, destName));
}

await variants("terka.jpg", "terka", [640, 960, 1280]);
await variants("terka-kreslo.jpg", "terka-kreslo", [640, 960, 1280]);
await variants("workshop-praha.jpg", "workshop-praha", [800, 1280, 1920]);
await variants("prosecco-vecer.jpg", "prosecco-vecer", [640, 960]);
await ogShare("terka.jpg", "og-terka-1200.jpg");

console.log("Optimized image variants written to public/");
