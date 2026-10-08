import type { SiteModule } from "./types";

/** Section colour pairs defined in globals.css. */
export type SectionTone = "hall" | "sk" | "seniors" | "schools" | "health" | "advisory";

export const MODULES: Record<SiteModule, { path: string; tone: SectionTone }> = {
  hall: { path: "/barangay-hall", tone: "hall" },
  health: { path: "/health", tone: "health" },
  sk: { path: "/sk", tone: "sk" },
  seniors: { path: "/senior-citizens", tone: "seniors" },
  schools: { path: "/schools", tone: "schools" },
};

export const ABOUT_PATH = "/about";

export function schoolPath(slug: string): string {
  return `${MODULES.schools.path}/${slug}`;
}

export function announcementPath(slug: string): string {
  return `${MODULES.hall.path}/announcements/${slug}`;
}
