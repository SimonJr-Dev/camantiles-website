import { CITY_SITE, type Action, type Actor, type Assignment, type Resource } from "./roles.ts";

/** Section that Barangay Editors look after. */
const HALL = "hall";

function current(assignment: Assignment, now: Date): boolean {
  return !assignment.endsAt || assignment.endsAt > now;
}

/** Whether an assignment reaches the resource at all, before looking at the action. */
function covers(assignment: Assignment, resource: Resource): boolean {
  switch (assignment.role) {
    case "super_admin":
    case "city_admin":
      return true;
    case "city_editor":
      return resource.site === CITY_SITE;
    case "barangay_admin":
      return assignment.site === resource.site;
    case "barangay_editor":
      return assignment.site === resource.site && resource.scope === HALL;
    case "approver":
      // An approver for the whole barangay has no scope; one for a section has it set.
      return (
        assignment.site === resource.site &&
        (assignment.scope === null || assignment.scope === resource.scope)
      );
    case "section_editor":
      return (
        assignment.site === resource.site &&
        assignment.scope !== null &&
        assignment.scope === resource.scope
      );
  }
}

function allows(
  assignment: Assignment,
  action: Action,
  resource: Resource,
  actor: Actor,
): boolean {
  const ownDraft = resource.status === "draft" && resource.authorId === actor.id;

  switch (assignment.role) {
    case "super_admin":
      return true;

    case "city_admin":
      // Runs the city's own content and oversees barangays, without writing their pages.
      if (resource.site === CITY_SITE) return true;
      return (
        action === "users.manage" ||
        action === "activity.view" ||
        action === "content.view" ||
        action === "content.unpublish"
      );

    case "city_editor":
      return (
        action === "content.view" ||
        action === "content.edit" ||
        action === "content.submit" ||
        action === "advisory.post" ||
        (action === "content.delete" && ownDraft)
      );

    case "barangay_admin":
      return true;

    case "barangay_editor":
    case "section_editor":
      switch (action) {
        case "content.view":
        case "content.edit":
        case "content.submit":
          return true;
        case "content.publish":
        case "content.unpublish":
          return assignment.canPublish;
        case "content.delete":
          return ownDraft;
        case "advisory.post":
          return assignment.role === "barangay_editor";
        default:
          return false;
      }

    case "approver":
      return (
        action === "content.view" ||
        action === "content.publish" ||
        action === "content.unpublish" ||
        action === "advisory.post" ||
        action === "activity.view"
      );
  }
}

/**
 * The single permission check. Every screen, save and publish goes through it,
 * on the server. An assignment never reaches outside its own barangay, section
 * or school; a suspended user or an ended term grants nothing.
 */
export function can(
  actor: Actor | null | undefined,
  action: Action,
  resource: Resource,
  now: Date = new Date(),
): boolean {
  if (!actor || !actor.active) return false;
  return actor.assignments.some(
    (assignment) =>
      current(assignment, now) &&
      covers(assignment, resource) &&
      allows(assignment, action, resource, actor),
  );
}

/** Sites the actor has any standing in. "*" means all of them. */
export function sitesFor(actor: Actor | null | undefined, now: Date = new Date()): string[] | "*" {
  if (!actor || !actor.active) return [];
  const live = actor.assignments.filter((assignment) => current(assignment, now));
  if (live.some((a) => a.role === "super_admin" || a.role === "city_admin")) return "*";
  return [...new Set(live.flatMap((a) => (a.site ? [a.site] : [])))];
}

/**
 * Whether the actor may take the action in at least one place they are
 * assigned to. For deciding what to show in menus, never for allowing a save.
 */
export function canSomewhere(
  actor: Actor | null | undefined,
  action: Action,
  now: Date = new Date(),
): boolean {
  if (!actor || !actor.active) return false;
  return actor.assignments.some((assignment) =>
    can(
      actor,
      action,
      {
        site: assignment.site ?? CITY_SITE,
        // A Barangay Editor's assignment has no scope of its own; it means Barangay Hall.
        scope: assignment.scope ?? (assignment.role === "barangay_editor" ? HALL : undefined),
      },
      now,
    ),
  );
}
