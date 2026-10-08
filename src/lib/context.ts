import "server-only";

import { notFound } from "next/navigation";

import { getDictionary, type Dictionary } from "@/i18n";
import { getSite, hasLocale, type Locale, type Site } from "@/sites";

export type PageContext = {
  site: Site;
  locale: Locale;
  dict: Dictionary;
};

/** Resolves what every route needs from its params; 404s on an unknown language. */
export async function getPageContext(params: Promise<{ lang: string }>): Promise<PageContext> {
  const { lang } = await params;
  const site = getSite();
  if (!site || !hasLocale(site, lang)) notFound();
  return { site, locale: lang, dict: await getDictionary(site, lang) };
}
