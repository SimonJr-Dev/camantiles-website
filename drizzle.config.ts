import { defineConfig } from "drizzle-kit";

// Used by `npm run db:generate` to turn changes in src/db/schema.ts into SQL
// files under drizzle/. Those files are applied by scripts/migrate.mjs.
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgres://camantiles:camantiles@localhost:54329/camantiles",
  },
});
