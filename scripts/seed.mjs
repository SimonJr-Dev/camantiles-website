// Creates the first accounts. Safe to run again: existing emails are left alone.
//
//   node scripts/seed.mjs            the Super Admin only
//   node scripts/seed.mjs --demo     plus one sample account per role, for local testing
//
// The Super Admin comes from SEED_ADMIN_EMAIL, SEED_ADMIN_NAME and
// SEED_ADMIN_PASSWORD. Without them, a local-only account is created; that
// default is refused when NODE_ENV is "production".
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";
import { hashPassword } from "better-auth/crypto";
import postgres from "postgres";

import { DATABASE_URL as LOCAL_URL } from "./db.mjs";

export const LOCAL_ADMIN = { email: "admin@camantiles.local", password: "password" };
const DEMO_PASSWORD = "password";
const SITE = "camantiles";

const demo = [
  { name: "Demo Barangay Admin", email: "secretary@camantiles.local", role: "barangay_admin", site: SITE },
  { name: "Demo Barangay Editor", email: "hall@camantiles.local", role: "barangay_editor", site: SITE },
  { name: "Demo Approver", email: "captain@camantiles.local", role: "approver", site: SITE },
  { name: "Demo SK Editor", email: "sk@camantiles.local", role: "section_editor", site: SITE, scope: "sk" },
  { name: "Demo Health Editor", email: "health@camantiles.local", role: "section_editor", site: SITE, scope: "health" },
  { name: "Demo School Editor", email: "highschool@camantiles.local", role: "section_editor", site: SITE, scope: "high-school" },
];

async function createAccount(sql, { name, email, password, role, site = null, scope = null }) {
  const [existing] = await sql`select id from "user" where email = ${email}`;
  if (existing) return false;

  const id = randomUUID();
  await sql.begin(async (tx) => {
    await tx`insert into "user" (id, name, email, email_verified) values (${id}, ${name}, ${email}, true)`;
    await tx`insert into account (id, account_id, provider_id, user_id, password)
             values (${randomUUID()}, ${id}, 'credential', ${id}, ${await hashPassword(password)})`;
    await tx`insert into assignment (user_id, role, site, scope) values (${id}, ${role}, ${site}, ${scope})`;
  });
  return true;
}

export async function seed({ withDemo = false, url = process.env.DATABASE_URL ?? LOCAL_URL } = {}) {
  const production = process.env.NODE_ENV === "production";
  const admin = {
    name: process.env.SEED_ADMIN_NAME ?? "Super Admin",
    email: process.env.SEED_ADMIN_EMAIL ?? LOCAL_ADMIN.email,
    password: process.env.SEED_ADMIN_PASSWORD ?? LOCAL_ADMIN.password,
    role: "super_admin",
  };
  if (production && (!process.env.SEED_ADMIN_EMAIL || !process.env.SEED_ADMIN_PASSWORD)) {
    throw new Error("Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD to create the first admin.");
  }
  if (production && withDemo) throw new Error("Demo accounts are for local use only.");

  const sql = postgres(url, { max: 1, onnotice: () => {} });
  const created = [];
  try {
    if (await createAccount(sql, admin)) created.push(admin.email);
    if (withDemo) {
      for (const account of demo) {
        if (await createAccount(sql, { ...account, password: DEMO_PASSWORD })) created.push(account.email);
      }
    }
  } finally {
    await sql.end();
  }
  return created;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const withDemo = process.argv.includes("--demo");
  const created = await seed({ withDemo });
  console.log(created.length ? `Created: ${created.join(", ")}` : "Nothing to create; accounts already exist.");
  if (!process.env.SEED_ADMIN_EMAIL) {
    console.log(`Local sign-in: ${LOCAL_ADMIN.email} / ${LOCAL_ADMIN.password}`);
    if (withDemo) console.log(`Demo accounts use the password: ${DEMO_PASSWORD}`);
  }
}
