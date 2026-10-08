import type { SectionTone } from "@/sites/modules";
import type { Localized } from "@/sites/types";

import type { AboutContent } from "./about";
import type { SchoolsContent } from "./schools";
import type { HealthContent, SeniorsContent, SkContent } from "./sections";

export type ContentStatus = "draft" | "review" | "published" | "archived";

/** Carried by every editable record so roles and approval can be added later (docs/user-roles.md). */
export type ContentMeta = {
  site: string;
  /** A module ("hall", "sk", …) or a school slug: decides which editors may change it. */
  scope: string;
  status: ContentStatus;
  author: string;
  publishedAt: string | null;
  expiresAt?: string;
};

export type Announcement = ContentMeta & {
  slug: string;
  category: SectionTone;
  /** ISO date (YYYY-MM-DD); null until supplied. */
  date: string | null;
  title: Localized;
  summary: Localized;
  body?: Localized;
  image?: string;
  /** Shown as the large card at the top of the Barangay Hall page. */
  pinned?: boolean;
};

export type Event = ContentMeta & {
  slug: string;
  /** ISO date (YYYY-MM-DD); null until supplied. */
  date: string | null;
  time: string | null;
  title: Localized;
  host: Localized;
  location?: Localized;
};

export type Advisory = ContentMeta & {
  text: Localized;
};

export type Service = ContentMeta & {
  slug: string;
  name: Localized;
};

export type Download = ContentMeta & {
  slug: string;
  title: Localized;
  /** Public path to the file; null until supplied. */
  file: string | null;
  format: string;
};

export type PersonGroup = "barangay";

export type Person = ContentMeta & {
  id: string;
  /** null until supplied. */
  name: string | null;
  role: Localized;
  photo?: string;
  group: PersonGroup;
};

export type SiteContent = {
  /** The one advisory shown at the top of the home page; null when there is none. */
  advisory: Advisory | null;
  announcements: Announcement[];
  events: Event[];
  services: Service[];
  downloads: Download[];
  people: Person[];
  about: AboutContent;
  health: HealthContent;
  sk: SkContent;
  seniors: SeniorsContent;
  schools: SchoolsContent;
};
