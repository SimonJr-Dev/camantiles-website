import type { Localized } from "@/sites/types";

/** Two-line hero heading; `lead` overrides the shared one when a site wants its own. */
type Hero = { titleLine1: Localized; titleLine2: Localized; lead?: Localized };

export type StaffMember = {
  id: string;
  /** null until supplied. */
  name: string | null;
  role: Localized;
  /** What they look after, shown as a small tag. */
  focus?: Localized;
};

export type PublicDocument = {
  id: string;
  title: Localized;
  /** Public path to the file; null until supplied. */
  file: string | null;
  format: string;
};

export type HealthIcon = "stethoscope" | "heart" | "syringe" | "users" | "pill" | "chart";

export type HealthContent = {
  hero: Hero;
  clinic: { hours: Localized | null; emergency: string | null };
  services: { icon: HealthIcon; title: Localized; text: Localized; tag: Localized }[];
  schedule: { day: Localized; service: Localized; time: string | null }[];
  bring: Localized[];
  updates: {
    id: string;
    kind: "advisory" | "program" | "event";
    date: string | null;
    title: Localized;
    text: Localized;
  }[];
  team: StaffMember[];
};

export type SkContent = {
  hero: Hero;
  facebook: { label: string; url: string } | null;
  programs: { id: string; label: Localized; title: Localized; text: Localized }[];
  updates: { id: string; date: string | null; title: Localized; text: Localized }[];
  documents: PublicDocument[];
  council: StaffMember[];
};

export type SeniorsIcon = "pulse" | "pill" | "activity";

export type SeniorsContent = {
  hero: Hero;
  president: { name: string | null; phone: string | null };
  payouts: {
    id: string;
    benefit: Localized;
    date: string | null;
    time: string | null;
    venue: Localized | null;
  }[];
  health: { icon: SeniorsIcon; title: Localized; text: Localized; schedule: Localized | null }[];
  /** Photo subjects for the activities gallery. */
  activities: Localized[];
  requirements: Localized[];
};
