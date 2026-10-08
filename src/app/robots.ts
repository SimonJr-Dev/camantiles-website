import type { MetadataRoute } from "next";

import { getSite } from "@/sites";

export default function robots(): MetadataRoute.Robots {
  const site = getSite();
  const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? site?.url ?? "").replace(/\/$/, "");

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: origin ? `${origin}/sitemap.xml` : undefined,
  };
}
