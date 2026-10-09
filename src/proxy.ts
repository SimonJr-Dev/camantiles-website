import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

import { getSite, hasLocale } from "@/sites";

const ADMIN = "/admin";
const SIGN_IN = "/admin/sign-in";

/** Picks the visitor's language from Accept-Language, falling back to the site default. */
function preferredLocale(request: NextRequest) {
  const site = getSite()!;
  const accepted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase().split("-")[0])
    // Browsers report Filipino as either "fil" or "tl" (Tagalog).
    .map((code) => (code === "tl" ? "fil" : code));
  return accepted.find((code) => hasLocale(site, code)) ?? site.defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Staff area: no language prefix. Anyone without a session cookie goes
  // straight to sign-in. This only saves a round trip; the pages and every
  // save check the session properly on the server.
  if (pathname === ADMIN || pathname.startsWith(`${ADMIN}/`)) {
    if (pathname !== SIGN_IN && !getSessionCookie(request)) {
      return NextResponse.redirect(new URL(SIGN_IN, request.url));
    }
    return;
  }

  // Public site: every page lives under /[lang]; URLs without a language are redirected to one.
  const site = getSite()!;
  const first = pathname.split("/")[1] ?? "";
  if (hasLocale(site, first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals, the API and anything with a file extension (images, icons).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
