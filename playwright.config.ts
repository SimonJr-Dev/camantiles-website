import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);
const baseURL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

// Tests run in Microsoft Edge, which is already on Windows, so no browser
// download is needed. They run against a production build on its own port,
// with the local database and sample accounts (scripts/test-server.mjs), so
// they do not disturb a dev server on 3000; a server already on that port is reused.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  // A few browsers at a time keeps one machine from slowing every page down.
  workers: 3,
  expect: { timeout: 15_000 },
  reporter: [["list"]],
  use: { baseURL, channel: "msedge", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "phone", use: { ...devices["Pixel 7"], channel: "msedge" } },
  ],
  webServer: {
    command: `node scripts/test-server.mjs ${PORT}`,
    url: `${baseURL}/en`,
    reuseExistingServer: true,
    timeout: 240_000,
  },
});
