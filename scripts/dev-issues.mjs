// Opens pages on the DEV server and reports what the Next.js development
// overlay is flagging (the red "Issues" badge), such as blocking-navigation
// warnings. Needs `npm run dev` running.
// Usage: node scripts/dev-issues.mjs [baseUrl] [--sign-in] <route> [route ...]
import { chromium } from "@playwright/test";

const args = process.argv.slice(2);
const base = args.find((arg) => arg.startsWith("http")) ?? "http://localhost:3000";
const signIn = args.includes("--sign-in");
const routes = args.filter((arg) => arg.startsWith("/"));

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const consoleErrors = [];
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text().slice(0, 300));
});

if (signIn) {
  await page.goto(`${base}/admin/sign-in`);
  await page.getByLabel("Email").fill("admin@camantiles.local");
  await page.getByLabel("Password", { exact: true }).fill("password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL(/\/admin$/);
}

let flagged = 0;
for (const route of routes) {
  consoleErrors.length = 0;
  await page.goto(base + route);
  await page.waitForTimeout(4000);
  // The overlay lives in a shadow root under <nextjs-portal>.
  const overlay = await page.evaluate(() =>
    [...document.querySelectorAll("nextjs-portal")]
      .map((portal) => portal.shadowRoot?.textContent ?? "")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim(),
  );
  const issues = overlay.match(/\d+\s*Issues?/i)?.[0] ?? null;
  const urlData = consoleErrors.filter((text) => /Suspense|instant|prerender/i.test(text));
  if (issues || urlData.length) flagged++;
  console.log(`${route}: ${issues ?? "no issues badge"}${urlData.length ? ` | console: ${urlData[0]}` : ""}`);
}

await browser.close();
if (flagged) process.exit(1);
