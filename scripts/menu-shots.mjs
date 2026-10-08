// Screenshots of the header and the open menu at several widths, for a visual
// check of the navigation. Needs the site running.
// Usage: node scripts/menu-shots.mjs [baseUrl]
// Output: .compare/responsive/menu-<width>.png
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3000";
const out = resolve(".compare/responsive");
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: "msedge" });
for (const [width, height, path] of [
  [390, 844, "/en"],
  [390, 844, "/fil/schools/high-school"],
  [768, 900, "/en"],
  [1024, 700, "/en"],
  [1280, 700, "/fil"],
]) {
  const page = await browser.newPage({ viewport: { width, height }, hasTouch: width < 1280 });
  await page.goto(base + path, { waitUntil: "networkidle" });
  const menu = page.getByRole("button", { name: /menu/i }).first();
  if (width < 1280) await menu.click();
  else await page.getByRole("button", { name: /menu/i }).first().click();
  await page.waitForTimeout(300);
  const name = `menu-${width}${path.includes("fil") ? "-fil" : ""}.png`;
  await page.screenshot({ path: resolve(out, name) });
  await page.close();
}
await browser.close();
console.log("saved to .compare/responsive/menu-*.png");
