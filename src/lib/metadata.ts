import type { Metadata } from "next";

import type { PageContext } from "./context";
import { siteHref } from "./href";

/**
 * Metadata for one page: its title and description, the canonical URL, and
 * links to the same page in each language so search engines pair them up.
 * `path` is site-relative ("/", "/schools"). Leave `title` out on the home page.
 */
export function pageMetadata(
  { site, locale }: PageContext,
  path: string,
  { title, description }: { title?: string; description?: string },
): Metadata {
  const url = siteHref(site, locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(site.locales.map((other) => [other, siteHref(site, other, path)])),
        "x-default": siteHref(site, site.defaultLocale, path),
      },
    },
    openGraph: {
      type: "website",
      title: title ?? site.name,
      description,
      url,
      siteName: site.name,
      locale,
      images: [{ url: site.seal.src, width: 512, height: 512, alt: site.name }],
    },
  };
}
