// Splits a side-by-side comparison from compare.mjs into screen-height slices
// that are easier to inspect. Usage: node scripts/compare-parts.mjs en-1440
import { resolve } from "node:path";
import sharp from "sharp";

const name = process.argv[2];
const file = resolve(".compare", `${name}-side.png`);
const { width, height } = await sharp(file).metadata();
const SLICE = 1100;

let count = 0;
for (let top = 0; top < height; top += SLICE) {
  await sharp(file)
    .extract({ left: 0, top, width, height: Math.min(SLICE, height - top) })
    .resize({ width: 2000 })
    .toFile(resolve(".compare", `${name}-part${count++}.png`));
}
console.log(`${count} slices → .compare/${name}-part*.png`);
