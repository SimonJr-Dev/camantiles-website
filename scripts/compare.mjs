// Screenshots a built page next to its original design file so the two can be
// compared by eye. Needs the dev server running and Microsoft Edge installed.
//
// Usage: node scripts/compare.mjs <route> <source.html> [width] [port]
//   e.g. node scripts/compare.mjs /en index.html
// Output: .compare/<name>-built.png, .compare/<name>-source.png, .compare/<name>-side.png
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const [route = "/en", source = "index.html", width = "1440", port = "3210"] = process.argv.slice(2);
const edge = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
].find(existsSync);
if (!edge) throw new Error("Microsoft Edge not found");

const HEIGHT = 9000;
const out = resolve(".compare");
mkdirSync(out, { recursive: true });
const name = `${route.replace(/^\//, "").replace(/\//g, "_") || "root"}-${width}`;

function shoot(url, file) {
  execFileSync(
    edge,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      `--window-size=${width},${HEIGHT}`,
      "--virtual-time-budget=4000",
      `--screenshot=${file}`,
      url,
    ],
    { stdio: "ignore" },
  );
}

/** Crops the empty page background below the footer. */
async function trim(file) {
  const image = sharp(file);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const x = Math.floor(info.width / 2);
  let bottom = info.height - 1;
  while (bottom > 0 && data[(bottom * info.width + x) * info.channels] > 200) bottom--;
  const height = Math.min(info.height, bottom + 40);
  return sharp(file).extract({ left: 0, top: 0, width: info.width, height }).png().toBuffer();
}

const builtFile = resolve(out, `${name}-built.png`);
const sourceFile = resolve(out, `${name}-source.png`);
shoot(`http://localhost:${port}${route}`, builtFile);
shoot(pathToFileURL(resolve("docs/ui-source", source)).href, sourceFile);

const [built, original] = await Promise.all([trim(builtFile), trim(sourceFile)]);
const [a, b] = await Promise.all([sharp(built).metadata(), sharp(original).metadata()]);
const w = Number(width);
await sharp({
  create: {
    width: w * 2 + 20,
    height: Math.max(a.height, b.height),
    channels: 3,
    background: "#ff00ff",
  },
})
  .composite([
    { input: original, left: 0, top: 0 },
    { input: built, left: w + 20, top: 0 },
  ])
  .png()
  .toFile(resolve(out, `${name}-side.png`));

await sharp(built).toFile(builtFile);
await sharp(original).toFile(sourceFile);
console.log(`source ${b.height}px tall, built ${a.height}px tall → .compare/${name}-side.png (source left, built right)`);
