// Lays several screenshots from .compare/responsive side by side, cropped to a
// slice, so a few pages can be reviewed in one image.
// Usage: node scripts/montage.mjs <out-name> <top> <height> <file> [file ...]
import { resolve } from "node:path";
import sharp from "sharp";

const [name, top = "0", height = "1600", ...files] = process.argv.slice(2);
const dir = resolve(".compare/responsive");
const GAP = 24;

const tiles = [];
for (const file of files) {
  const input = resolve(dir, file);
  const meta = await sharp(input).metadata();
  const y = Math.min(Number(top), Math.max(0, meta.height - 1));
  const h = Math.min(Number(height), meta.height - y);
  tiles.push({ buffer: await sharp(input).extract({ left: 0, top: y, width: meta.width, height: h }).toBuffer(), width: meta.width, height: h });
}

const width = tiles.reduce((sum, tile) => sum + tile.width + GAP, -GAP);
let left = 0;
await sharp({ create: { width, height: Math.max(...tiles.map((tile) => tile.height)), channels: 3, background: "#ff00ff" } })
  .composite(tiles.map((tile) => {
    const placed = { input: tile.buffer, left, top: 0 };
    left += tile.width + GAP;
    return placed;
  }))
  .png()
  .toFile(resolve(dir, `${name}.png`));
console.log(`.compare/responsive/${name}.png (${width}px wide)`);
