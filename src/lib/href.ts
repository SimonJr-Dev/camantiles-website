import type { Locale, Site } from "@/sites/types";

/**
 * Builds every internal link. `path` is site-relative ("/", "/schools").
 * `site` is unused while there is one barangay; it becomes part of the URL
 * when sites move under /barangays/[barangay] (docs/multi-site-plan.md).
 */
export function siteHref(site: Site, locale: Locale, path: string = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** The same page in another language. */
export function switchLocale(pathname: string, from: Locale, to: Locale): string {
  if (pathname === `/${from}`) return `/${to}`;
  if (pathname.startsWith(`/${from}/`)) return `/${to}${pathname.slice(from.length + 1)}`;
  return `/${to}`;
}
