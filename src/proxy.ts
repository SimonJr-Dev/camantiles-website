import { NextResponse, type NextRequest } from "next/server";

import { getSite, hasLocale } from "@/sites";

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

/** Every page lives under /[lang]; URLs without a language are redirected to one. */
export function proxy(request: NextRequest) {
  const site = getSite()!;
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (hasLocale(site, first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals and anything with a file extension (images, icons).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
