// Applies the SQL files in drizzle/ that the database has not seen yet.
// Safe to run repeatedly. Usage: node scripts/migrate.mjs  (reads DATABASE_URL)
import { pathToFileURL } from "node:url";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { DATABASE_URL as LOCAL_URL } from "./db.mjs";

export async function runMigrations(url = process.env.DATABASE_URL ?? LOCAL_URL) {
  const sql = postgres(url, { max: 1, onnotice: () => {} });
  try {
    await migrate(drizzle(sql), { migrationsFolder: "drizzle" });
  } finally {
    await sql.end();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await runMigrations();
  console.log("Database is up to date.");
}
