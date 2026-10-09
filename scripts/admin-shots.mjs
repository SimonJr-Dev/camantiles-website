// Screenshots of the staff area for a visual check: the sign-in page and the
// dashboard for two roles, on a wide screen and a phone. Needs `npm run dev`
// running (it provides both the site and the database).
// Usage: node scripts/admin-shots.mjs [baseUrl]
// Output: .compare/admin/*.png
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3000";
const out = resolve(".compare/admin");
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: "msedge" });

async function shots(label, viewport, isMobile) {
  const context = await browser.newContext({ viewport, isMobile, hasTouch: isMobile });
  const page = await context.newPage();
  const save = (name) => page.screenshot({ path: resolve(out, `${name}-${label}.png`), fullPage: true });

  await page.goto(`${base}/admin/sign-in`, { waitUntil: "networkidle" });
  await save("sign-in");
  await page.getByLabel("Email").fill("admin@camantiles.local");
  await page.getByLabel("Password", { exact: true }).fill("wrong-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.locator("form [role=alert]").waitFor();
  await save("sign-in-error");

  for (const [who, email, password] of [
    ["admin", "admin@camantiles.local", "password"],
    ["sk-editor", "sk@camantiles.local", "password"],
  ]) {
    await context.clearCookies();
    await page.goto(`${base}/admin/sign-in`, { waitUntil: "networkidle" });
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.waitForURL(/\/admin$/);
    await page.getByRole("heading", { level: 1, name: /Welcome/ }).waitFor();
    await page.waitForLoadState("networkidle");
    await save(`dashboard-${who}`);
    if (isMobile) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.waitForTimeout(200);
      await page.screenshot({ path: resolve(out, `menu-${who}-${label}.png`) });
    }
  }
  await context.close();
}

try {
  await shots("desktop", { width: 1440, height: 900 }, false);
  await shots("phone", { width: 390, height: 844 }, true);
  console.log("saved to .compare/admin/");
} finally {
  await browser.close();
}
