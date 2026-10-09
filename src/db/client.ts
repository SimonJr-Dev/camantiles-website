import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

// The local server started by `npm run dev` (scripts/db.mjs). Production must
// set DATABASE_URL; there is no fallback there, so a missing value fails loudly.
const LOCAL_URL = "postgres://camantiles:camantiles@localhost:54329/camantiles";

function connectionString(): string {
  const url = process.env.DATABASE_URL;
  if (url) return url;
  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is not set");
  }
  return LOCAL_URL;
}

// Reused across hot reloads in development so connections do not pile up.
const globalForDb = globalThis as unknown as { __sql?: ReturnType<typeof postgres> };
const sql = (globalForDb.__sql ??= postgres(connectionString(), { max: 10, onnotice: () => {} }));

export const db = drizzle(sql, { schema });
export type Database = typeof db;
