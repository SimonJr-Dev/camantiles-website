import type { MetadataRoute } from "next";

import { getAnnouncements } from "@/content";
import { siteHref } from "@/lib/href";
import { getSite } from "@/sites";
import { ABOUT_PATH, announcementPath, MODULES, schoolPath } from "@/sites/modules";

/** Every page in every language, each listing its counterparts in the other languages. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getSite();
  if (!site) return [];
  const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "");

  const paths = [
    "/",
    ABOUT_PATH,
    ...site.modules.map((module) => MODULES[module].path),
    ...site.schools.map((school) => schoolPath(school.slug)),
    ...(await getAnnouncements(site)).map((item) => announcementPath(item.slug)),
  ];

  return paths.flatMap((path) =>
    site.locales.map((locale) => ({
      url: origin + siteHref(site, locale, path),
      alternates: {
        languages: Object.fromEntries(
          site.locales.map((other) => [other, origin + siteHref(site, other, path)]),
        ),
      },
    })),
  );
}
