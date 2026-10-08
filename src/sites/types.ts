export const LOCALES = ["en", "fil"] as const;
export type Locale = (typeof LOCALES)[number];

export type Localized = Record<Locale, string>;

export const SITE_MODULES = ["hall", "health", "sk", "seniors", "schools"] as const;
export type SiteModule = (typeof SITE_MODULES)[number];

export type SchoolRef = {
  slug: string;
  /** Full name, e.g. "Camantiles High School". */
  name: Localized;
  /** Short label used in navigation. */
  navLabel: Localized;
  level: Localized;
};

export type Hotline = {
  id: "hall" | "tanod" | "health" | "city";
  label: Localized;
  /** null until the barangay supplies it. */
  number: string | null;
};

export type SiteTheme = {
  primary?: string;
  link?: string;
  accent?: string;
};

export type Site = {
  slug: string;
  /** Public address of the site, without a trailing slash. */
  url: string;
  name: string;
  shortName: string;
  city: Localized;
  province: string;
  seal: { src: string; icon: string };
  locales: readonly Locale[];
  defaultLocale: Locale;
  /** Sections this barangay has, in navigation order. */
  modules: readonly SiteModule[];
  schools: readonly SchoolRef[];
  /** Sections featured as tiles on the home page. */
  homeQuickLinks: readonly SiteModule[];
  contact: {
    street: Localized | null;
    hours: Localized | null;
    email: string | null;
  };
  hotlines: readonly Hotline[];
  social: {
    facebook: { label: string; url: string } | null;
  };
  theme?: SiteTheme;
  credits: string;
};
