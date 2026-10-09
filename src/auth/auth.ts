import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { twoFactor } from "better-auth/plugins/two-factor";

import { db } from "@/db/client";
import * as schema from "@/db/schema";
import { sendEmail } from "@/lib/email";

// Signs session cookies. Production must set BETTER_AUTH_SECRET; the fallback
// exists only so local development works without setup.
function secret(): string {
  const value = process.env.BETTER_AUTH_SECRET;
  if (value) return value;
  if (process.env.NODE_ENV === "production") {
    throw new Error("BETTER_AUTH_SECRET is not set");
  }
  return "local-development-secret-not-for-production";
}

/**
 * Sign-in for staff. Accounts are created by invitation only: public sign-up
 * is off, so the only way in is an account an admin made (docs/user-roles.md).
 */
export const auth = betterAuth({
  appName: "Barangay Admin",
  secret: secret(),
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 12,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Set your password",
        text: `Hello ${user.name},\n\nUse this link to set your password. It works once and expires in an hour.\n\n${url}`,
      });
    },
  },
  user: {
    additionalFields: {
      // Set by admins only, never by the user's own requests.
      active: { type: "boolean", defaultValue: true, input: false },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  // nextCookies must stay last: it lets Server Actions set the session cookie.
  plugins: [twoFactor(), nextCookies()],
});
