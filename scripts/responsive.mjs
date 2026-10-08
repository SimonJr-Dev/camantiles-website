// Opens pages at phone, tablet and desktop widths in Microsoft Edge, reports
// anything wider than the screen, and saves full-page screenshots.
// Needs the site running. Usage:
//   node scripts/responsive.mjs [baseUrl] [route ...]
//   node scripts/responsive.mjs http://localhost:3000 /en /en/health
// Output: .compare/responsive/<route>-<width>.png
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const [base = "http://localhost:3000", ...only] = process.argv.slice(2);
const WIDTHS = [360, 390, 768, 1024, 1440];
const ROUTES = only.length
  ? only
  : [
      "/en",
      "/en/about",
      "/en/barangay-hall",
      "/en/barangay-hall/announcements/general-barangay-assembly",
      "/en/health",
      "/en/sk",
      "/en/senior-citizens",
      "/en/schools",
      "/en/schools/elementary-school",
      "/en/schools/day-care-center",
      "/fil",
      "/fil/health",
    ];

const out = resolve(".compare/responsive");
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: "msedge" });
let problems = 0;

for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    isMobile: width < 768,
    hasTouch: width < 1024,
  });
  const page = await context.newPage();
  for (const route of ROUTES) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    // Elements that stick out past the right edge and so cause sideways scrolling.
    const overflow = await page.evaluate(() => {
      const limit = document.documentElement.clientWidth;
      if (document.documentElement.scrollWidth <= limit) return [];
      const inScroller = (el) => {
        for (let p = el.parentElement; p; p = p.parentElement) {
          const style = getComputedStyle(p);
          if (/(auto|scroll|hidden)/.test(style.overflowX)) return true;
        }
        return false;
      };
      return [...document.querySelectorAll("body *")]
        .filter((el) => el.getBoundingClientRect().right > limit + 1 && !inScroller(el))
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(" ").slice(0, 4).join(".")} (right edge ${Math.round(el.getBoundingClientRect().right)})`);
    });
    const name = `${route.replace(/^\//, "").replace(/\//g, "_")}-${width}.png`;
    await page.screenshot({ path: resolve(out, name), fullPage: true });
    if (overflow.length) {
      problems++;
      console.log(`${route} at ${width}px scrolls sideways:`);
      for (const item of overflow) console.log(`  ${item}`);
    }
  }
  await context.close();
}

await browser.close();
console.log(`\n${ROUTES.length} pages × ${WIDTHS.length} widths → .compare/responsive/`);
if (problems) {
  console.log(`${problems} page/width combinations scroll sideways.`);
  process.exit(1);
}
console.log("No page scrolls sideways at any width.");
