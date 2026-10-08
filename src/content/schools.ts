import type { Localized } from "@/sites/types";

import type { StaffMember } from "./sections";

export type SchoolFact = {
  label: Localized;
  /** null until supplied. */
  value: Localized | null;
  /** What to ask the school for, shown as a placeholder while developing. */
  pending: Localized;
};

export type SchoolGrade = {
  name: Localized;
  sections: { id: string; label: Localized; adviser: string | null }[];
};

export type SchoolContent = {
  /** Matches the slug in the site's school list. */
  slug: string;
  /** Short name for breadcrumbs. */
  short: Localized;
  level: Localized;
  /** One line for the card on the Schools index. */
  summary: Localized;
  tagline: Localized;
  enrollTitle: Localized;
  facts: SchoolFact[];
  /** null until the school supplies a description. */
  about: Localized | null;
  levels: Localized[];
  news: { id: string; date: string | null; title: Localized; text: Localized }[];
  facultyLead: Localized;
  faculty: StaffMember[];
  /** Class sections by grade. Leave out for schools without them, such as a day care. */
  grades?: SchoolGrade[];
  /** Alumni homecoming block. Leave out for schools without alumni activities. */
  alumni?: {
    homecoming: {
      date: string | null;
      venue: Localized | null;
      hostBatch: string | null;
      theme: Localized | null;
    };
    /** Years with a homecoming photo set, newest first. */
    years: string[];
  };
  galleryTitle: Localized;
  /** Photo subjects for the gallery. */
  gallery: Localized[];
  requirements: Localized[];
  head: {
    role: Localized;
    name: string | null;
    phone: string | null;
    email: string | null;
    address: Localized | null;
  };
};

export type SchoolsContent = {
  index: { titleLine1: Localized; titleLine2: Localized; lead: Localized };
  items: SchoolContent[];
};
