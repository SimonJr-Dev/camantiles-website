import { camantiles } from "./camantiles/site";
import { LOCALES, type Locale, type Site } from "./types";

const sites: Record<string, Site> = {
  [camantiles.slug]: camantiles,
};

const DEFAULT_SITE = camantiles.slug;

/**
 * Single-site for now, so the slug is optional. When barangays move under
 * /barangays/[barangay], callers pass the route param instead.
 */
export function getSite(slug: string = DEFAULT_SITE): Site | undefined {
  return sites[slug];
}

export function listSites(): Site[] {
  return Object.values(sites);
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function hasLocale(site: Site, value: string): value is Locale {
  return isLocale(value) && site.locales.includes(value);
}

export * from "./types";
