// Sets every account in the LOCAL database to one password and signs everyone
// out. For development only; it refuses to run against anything but the local
// database started by `npm run dev`.
// Usage: node scripts/set-local-passwords.mjs [password]
import { hashPassword } from "better-auth/crypto";
import postgres from "postgres";

import { DATABASE_URL } from "./db.mjs";

if (process.env.DATABASE_URL && process.env.DATABASE_URL !== DATABASE_URL) {
  throw new Error("Refusing to run: DATABASE_URL points somewhere other than the local database.");
}

const password = process.argv[2] ?? "password";
const sql = postgres(DATABASE_URL, { max: 1, connect_timeout: 10, onnotice: () => {} });
try {
  const hash = await hashPassword(password);
  const rows = await sql`
    update account set password = ${hash}, updated_at = now()
    where provider_id = 'credential' returning user_id`;
  await sql`delete from session`;
  console.log(`${rows.length} local accounts now use the password "${password}". Everyone is signed out.`);
} finally {
  await sql.end({ timeout: 5 });
}
