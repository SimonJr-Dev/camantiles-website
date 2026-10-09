// Local PostgreSQL for development and tests, with no installer and no Docker:
// the `embedded-postgres` package runs a real PostgreSQL server from
// node_modules, keeping its data in .data/postgres.
//
// Usage:
//   node scripts/db.mjs            start the server and keep it running (Ctrl+C stops it)
//   import { startDatabase } ...   used by scripts/dev.mjs and the test server
//
// Production does not use this file; it connects to whatever DATABASE_URL names.
import { existsSync } from "node:fs";
import net from "node:net";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import EmbeddedPostgres from "embedded-postgres";

export const DB = {
  port: Number(process.env.PGPORT ?? 54329),
  user: "camantiles",
  password: "camantiles",
  database: "camantiles",
};
export const DATABASE_URL = `postgres://${DB.user}:${DB.password}@localhost:${DB.port}/${DB.database}`;

const dataDir = resolve(".data/postgres");

function portInUse(port) {
  return new Promise((done) => {
    const socket = net.connect(port, "127.0.0.1");
    socket.once("connect", () => (socket.destroy(), done(true)));
    socket.once("error", () => done(false));
  });
}

/**
 * Starts the local server unless one is already listening on the port.
 * Returns a function that stops it (a no-op when it was already running).
 */
export async function startDatabase({ quiet = false } = {}) {
  if (await portInUse(DB.port)) {
    if (!quiet) console.log(`Database already running on port ${DB.port}.`);
    return async () => {};
  }

  const fresh = !existsSync(resolve(dataDir, "PG_VERSION"));
  const server = new EmbeddedPostgres({
    databaseDir: dataDir,
    port: DB.port,
    user: DB.user,
    password: DB.password,
    persistent: true,
    onLog: () => {},
    onError: (message) => {
      if (!quiet) console.error(String(message));
    },
  });

  if (fresh) await server.initialise();
  await server.start();
  if (fresh) await server.createDatabase(DB.database);
  if (!quiet) console.log(`Database running on port ${DB.port} (data in .data/postgres).`);

  return async () => {
    await server.stop();
  };
}

// Run directly: keep the server up until interrupted.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const stop = await startDatabase();
  console.log(`DATABASE_URL=${DATABASE_URL}`);
  const shutdown = async () => {
    await stop();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  setInterval(() => {}, 1 << 30);
}
