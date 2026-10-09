// One command for local work: starts the local database if it is not already
// running, brings it up to date, then runs a Next.js command with DATABASE_URL
// set. Stops the database again when Next.js exits.
//
// Usage: node scripts/dev.mjs [next arguments]
//   node scripts/dev.mjs dev            (this is what `npm run dev` runs)
//   node scripts/dev.mjs start -p 3100
import { spawn } from "node:child_process";

import { DATABASE_URL, startDatabase } from "./db.mjs";
import { runMigrations } from "./migrate.mjs";

const args = process.argv.slice(2);
const stopDatabase = await startDatabase();
await runMigrations(DATABASE_URL);

// One command string: with a shell, Node warns if arguments are passed separately.
const child = spawn(`npx next ${(args.length ? args : ["dev"]).join(" ")}`, {
  stdio: "inherit",
  shell: true,
  env: { DATABASE_URL, ...process.env },
});

let closing = false;
async function close(code = 0) {
  if (closing) return;
  closing = true;
  await stopDatabase();
  process.exit(code);
}
child.on("exit", (code) => close(code ?? 0));
process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
