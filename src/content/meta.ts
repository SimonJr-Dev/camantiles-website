import type { ContentMeta } from "./types";

/** Meta for records that live as files in the repo: always published, authored by the system. */
export function fileMeta(site: string, scope: string): ContentMeta {
  return { site, scope, status: "published", author: "system", publishedAt: null };
}
