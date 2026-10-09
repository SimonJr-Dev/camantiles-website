// Roles and scopes, as defined in docs/user-roles.md. No imports from the
// database or Next.js, so the permission rules can be tested on their own.

export const ROLES = [
  "super_admin",
  "city_admin",
  "city_editor",
  "barangay_admin",
  "barangay_editor",
  "approver",
  "section_editor",
] as const;
export type Role = (typeof ROLES)[number];

/** Site slug used for the city's own pages and city-wide advisories. */
export const CITY_SITE = "city";

/** One role held at one scope. */
export type Assignment = {
  role: Role;
  /** Barangay slug; null for platform and city roles. */
  site: string | null;
  /** A section ("hall", "sk", …) or a school slug; null means the whole barangay. */
  scope: string | null;
  canPublish: boolean;
  endsAt: Date | null;
};

export type Actor = {
  id: string;
  active: boolean;
  assignments: Assignment[];
};

export const ACTIONS = [
  /** See items that are not published yet. */
  "content.view",
  "content.edit",
  /** Send a draft for approval. */
  "content.submit",
  "content.publish",
  /** Hide a published item without deleting it. */
  "content.unpublish",
  "content.delete",
  /** Advisories publish at once, without review. */
  "advisory.post",
  /** Address, hours, hotlines, officials. */
  "site.edit",
  "users.manage",
  "activity.view",
] as const;
export type Action = (typeof ACTIONS)[number];

/** What an action is aimed at. */
export type Resource = {
  site: string;
  /** Section or school the item belongs to; leave out for site-wide things. */
  scope?: string;
  status?: "draft" | "review" | "published" | "archived";
  authorId?: string;
};

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  city_admin: "City Admin",
  city_editor: "City Editor",
  barangay_admin: "Barangay Admin",
  barangay_editor: "Barangay Editor",
  approver: "Approver",
  section_editor: "Section Editor",
};
