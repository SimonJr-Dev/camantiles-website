import "server-only";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { db } from "@/db/client";
import { assignment, user } from "@/db/schema";

import { auth } from "./auth";
import { can } from "./can";
import type { Action, Actor, Resource } from "./roles";

export const SIGN_IN_PATH = "/admin/sign-in";

/** The signed-in person with what they are allowed to do. Only safe fields. */
export type CurrentUser = Actor & { name: string; email: string };

/**
 * Who is making this request, or null. Looked up once per request. Every admin
 * screen and every save starts here; nothing trusts a check made elsewhere.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const [account] = await db
    .select({ id: user.id, name: user.name, email: user.email, active: user.active })
    .from(user)
    .where(eq(user.id, session.user.id));
  if (!account || !account.active) return null;

  const assignments = await db
    .select({
      role: assignment.role,
      site: assignment.site,
      scope: assignment.scope,
      canPublish: assignment.canPublish,
      endsAt: assignment.endsAt,
    })
    .from(assignment)
    .where(eq(assignment.userId, account.id));

  return { ...account, assignments };
});

/** For screens: sends anyone not signed in to the sign-in page. */
export async function requireUser(): Promise<CurrentUser> {
  const current = await getCurrentUser();
  if (!current) redirect(SIGN_IN_PATH);
  return current;
}

export class NotAllowedError extends Error {
  constructor() {
    super("You are not allowed to do that.");
    this.name = "NotAllowedError";
  }
}

/** For saves and publishes: returns the user, or throws if the action is not theirs to take. */
export async function authorize(action: Action, resource: Resource): Promise<CurrentUser> {
  const current = await getCurrentUser();
  if (!current || !can(current, action, resource)) throw new NotAllowedError();
  return current;
}
