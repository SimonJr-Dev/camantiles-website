// What the browser tests run against: the local database (migrated, with the
// sample accounts), then a production build served on its own port.
// Started by Playwright; see playwright.config.ts.
// Usage: node scripts/test-server.mjs [port]
import { spawn, spawnSync } from "node:child_process";

import { DATABASE_URL, startDatabase } from "./db.mjs";
import { runMigrations } from "./migrate.mjs";
import { seed } from "./seed.mjs";

const port = process.argv[2] ?? "3100";
const env = {
  ...process.env,
  DATABASE_URL,
  BETTER_AUTH_SECRET: "test-only-secret-never-used-outside-local-tests",
  BETTER_AUTH_URL: `http://localhost:${port}`,
};

const stopDatabase = await startDatabase({ quiet: true });
await runMigrations(DATABASE_URL);
await seed({ withDemo: true, url: DATABASE_URL });

const build = spawnSync("npx next build", { stdio: "inherit", shell: true, env });
if (build.status !== 0) {
  await stopDatabase();
  process.exit(build.status ?? 1);
}

const server = spawn(`npx next start -p ${port}`, { stdio: "inherit", shell: true, env });
const close = async (code = 0) => {
  await stopDatabase();
  process.exit(code);
};
server.on("exit", (code) => close(code ?? 0));
process.on("SIGINT", () => server.kill("SIGINT"));
process.on("SIGTERM", () => server.kill("SIGTERM"));
