import { canSomewhere } from "@/auth/can";
import type { Action, Actor } from "@/auth/roles";

export type AdminIcon =
  | "dashboard"
  | "announcements"
  | "events"
  | "pages"
  | "people"
  | "files"
  | "users"
  | "activity";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: AdminIcon;
  /** Listed so staff can see what is coming, but not yet open. */
  soon?: boolean;
};

export type AdminNavGroup = { label: string; items: AdminNavItem[] };

type Entry = AdminNavItem & { needs?: Action };

const GROUPS: { label: string; items: Entry[] }[] = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: "dashboard" }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/announcements", label: "Announcements", icon: "announcements", needs: "content.view", soon: true },
      { href: "/admin/events", label: "Events", icon: "events", needs: "content.view", soon: true },
      { href: "/admin/pages", label: "Pages", icon: "pages", needs: "content.view", soon: true },
      { href: "/admin/people", label: "People", icon: "people", needs: "content.view", soon: true },
      { href: "/admin/files", label: "Files", icon: "files", needs: "content.view", soon: true },
    ],
  },
  {
    label: "Administration",
    items: [
      { href: "/admin/users", label: "Users", icon: "users", needs: "users.manage", soon: true },
      { href: "/admin/activity", label: "Activity", icon: "activity", needs: "activity.view", soon: true },
    ],
  },
];

/** The menu for one person: only the areas their roles reach. */
export function navFor(actor: Actor): AdminNavGroup[] {
  return GROUPS.map((group) => ({
    label: group.label,
    items: group.items
      .filter((item) => !item.needs || canSomewhere(actor, item.needs))
      .map(({ href, label, icon, soon }) => ({ href, label, icon, soon })),
  })).filter((group) => group.items.length > 0);
}
