import "server-only";

import type { Locale, Site } from "@/sites/types";

type SharedDictionary = typeof import("./dictionaries/en.json");
type SiteDictionary = typeof import("@/sites/camantiles/dictionaries/en.json");

/** Interface copy shared by every barangay, plus `site` for this barangay's own copy. */
export type Dictionary = SharedDictionary & { site: SiteDictionary };

const shared: Record<Locale, () => Promise<SharedDictionary>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  fil: () => import("./dictionaries/fil.json").then((m) => m.default),
};

const bySite: Record<string, Record<Locale, () => Promise<SiteDictionary>>> = {
  camantiles: {
    en: () => import("@/sites/camantiles/dictionaries/en.json").then((m) => m.default),
    fil: () => import("@/sites/camantiles/dictionaries/fil.json").then((m) => m.default),
  },
};

export async function getDictionary(site: Site, locale: Locale): Promise<Dictionary> {
  const [base, own] = await Promise.all([shared[locale](), bySite[site.slug][locale]()]);
  return { ...base, site: own };
}

export { format } from "./format";
