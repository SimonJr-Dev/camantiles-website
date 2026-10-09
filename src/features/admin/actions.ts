"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/auth/auth";
import { SIGN_IN_PATH } from "@/auth/session";

const credentials = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(1),
});

export type SignInState = { error?: string; email?: string };

/** One message for every failure, so the form never reveals which emails have accounts. */
const FAILED = "That email and password do not match an account.";

export async function signIn(_previous: SignInState, form: FormData): Promise<SignInState> {
  const parsed = credentials.safeParse({
    email: form.get("email"),
    password: form.get("password"),
  });
  if (!parsed.success) return { error: FAILED, email: String(form.get("email") ?? "") };

  try {
    await auth.api.signInEmail({ body: parsed.data, headers: await headers() });
  } catch {
    return { error: FAILED, email: parsed.data.email };
  }
  redirect("/admin");
}

export async function signOut(): Promise<void> {
  await auth.api.signOut({ headers: await headers() });
  redirect(SIGN_IN_PATH);
}
