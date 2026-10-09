// Run with: npm run test:unit
import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { can, sitesFor } from "./can.ts";
import type { Actor, Assignment, Role } from "./roles.ts";

const NOW = new Date("2026-10-08T00:00:00Z");

function actor(id: string, ...assignments: Partial<Assignment & { role: Role }>[]): Actor {
  return {
    id,
    active: true,
    assignments: assignments.map((a) => ({
      role: a.role ?? "section_editor",
      site: a.site ?? null,
      scope: a.scope ?? null,
      canPublish: a.canPublish ?? false,
      endsAt: a.endsAt ?? null,
    })),
  };
}

const skEditor = actor("sk", { role: "section_editor", site: "camantiles", scope: "sk" });
const schoolEditor = actor("hs", { role: "section_editor", site: "camantiles", scope: "high-school" });
const hallEditor = actor("hall", { role: "barangay_editor", site: "camantiles" });
const skApprover = actor("skc", { role: "approver", site: "camantiles", scope: "sk" });
const captain = actor("pb", { role: "approver", site: "camantiles" });
const secretary = actor("sec", { role: "barangay_admin", site: "camantiles" });
const cityAdmin = actor("ca", { role: "city_admin" });
const cityEditor = actor("ce", { role: "city_editor" });
const superAdmin = actor("sa", { role: "super_admin" });

const sk = { site: "camantiles", scope: "sk" };
const hall = { site: "camantiles", scope: "hall" };
const highSchool = { site: "camantiles", scope: "high-school" };
const otherBarangaySk = { site: "nancayasan", scope: "sk" };

describe("section and school editors", () => {
  test("work only inside their own section", () => {
    assert.equal(can(skEditor, "content.edit", sk, NOW), true);
    assert.equal(can(skEditor, "content.submit", sk, NOW), true);
    assert.equal(can(skEditor, "content.view", sk, NOW), true);
    assert.equal(can(skEditor, "content.edit", hall, NOW), false);
    assert.equal(can(skEditor, "content.edit", highSchool, NOW), false);
    assert.equal(can(skEditor, "content.view", hall, NOW), false);
  });

  test("cannot reach the same section in another barangay", () => {
    assert.equal(can(skEditor, "content.edit", otherBarangaySk, NOW), false);
    assert.equal(can(skEditor, "content.view", otherBarangaySk, NOW), false);
  });

  test("a school editor is limited to their school", () => {
    assert.equal(can(schoolEditor, "content.edit", highSchool, NOW), true);
    assert.equal(can(schoolEditor, "content.edit", { site: "camantiles", scope: "elementary-school" }, NOW), false);
  });

  test("cannot publish unless granted", () => {
    assert.equal(can(skEditor, "content.publish", sk, NOW), false);
    const trusted = actor("sk2", { role: "section_editor", site: "camantiles", scope: "sk", canPublish: true });
    assert.equal(can(trusted, "content.publish", sk, NOW), true);
    assert.equal(can(trusted, "content.publish", hall, NOW), false);
  });

  test("can delete only their own drafts", () => {
    assert.equal(can(skEditor, "content.delete", { ...sk, status: "draft", authorId: "sk" }, NOW), true);
    assert.equal(can(skEditor, "content.delete", { ...sk, status: "draft", authorId: "someone" }, NOW), false);
    assert.equal(can(skEditor, "content.delete", { ...sk, status: "published", authorId: "sk" }, NOW), false);
  });

  test("cannot manage users, site details or advisories", () => {
    assert.equal(can(skEditor, "users.manage", { site: "camantiles" }, NOW), false);
    assert.equal(can(skEditor, "site.edit", { site: "camantiles" }, NOW), false);
    assert.equal(can(skEditor, "advisory.post", sk, NOW), false);
  });
});

describe("barangay editor", () => {
  test("handles Barangay Hall content and advisories, nothing else", () => {
    assert.equal(can(hallEditor, "content.edit", hall, NOW), true);
    assert.equal(can(hallEditor, "advisory.post", hall, NOW), true);
    assert.equal(can(hallEditor, "content.edit", sk, NOW), false);
    assert.equal(can(hallEditor, "content.publish", hall, NOW), false);
    assert.equal(can(hallEditor, "site.edit", { site: "camantiles" }, NOW), false);
  });
});

describe("approvers", () => {
  test("publish within their scope but do not write", () => {
    assert.equal(can(skApprover, "content.publish", sk, NOW), true);
    assert.equal(can(skApprover, "content.unpublish", sk, NOW), true);
    assert.equal(can(skApprover, "content.edit", sk, NOW), false);
    assert.equal(can(skApprover, "content.publish", hall, NOW), false);
  });

  test("a barangay-wide approver covers every section of that barangay only", () => {
    assert.equal(can(captain, "content.publish", sk, NOW), true);
    assert.equal(can(captain, "content.publish", highSchool, NOW), true);
    assert.equal(can(captain, "content.publish", otherBarangaySk, NOW), false);
    assert.equal(can(captain, "users.manage", { site: "camantiles" }, NOW), false);
  });
});

describe("barangay admin", () => {
  test("does everything inside their barangay", () => {
    for (const action of ["content.edit", "content.publish", "content.delete", "site.edit", "users.manage", "activity.view"] as const) {
      assert.equal(can(secretary, action, sk, NOW), true, action);
    }
  });

  test("has no reach into another barangay", () => {
    assert.equal(can(secretary, "content.view", otherBarangaySk, NOW), false);
    assert.equal(can(secretary, "users.manage", { site: "nancayasan" }, NOW), false);
  });
});

describe("city roles", () => {
  test("city admin oversees barangays without writing their content", () => {
    assert.equal(can(cityAdmin, "users.manage", { site: "camantiles" }, NOW), true);
    assert.equal(can(cityAdmin, "content.unpublish", sk, NOW), true);
    assert.equal(can(cityAdmin, "activity.view", sk, NOW), true);
    assert.equal(can(cityAdmin, "content.edit", sk, NOW), false);
    assert.equal(can(cityAdmin, "content.publish", sk, NOW), false);
    assert.equal(can(cityAdmin, "content.edit", { site: "city" }, NOW), true);
  });

  test("city editor works on city content only", () => {
    assert.equal(can(cityEditor, "content.edit", { site: "city" }, NOW), true);
    assert.equal(can(cityEditor, "advisory.post", { site: "city" }, NOW), true);
    assert.equal(can(cityEditor, "content.view", sk, NOW), false);
    assert.equal(can(cityEditor, "content.publish", { site: "city" }, NOW), false);
  });
});

describe("guards that apply to everyone", () => {
  test("nobody signed in, a suspended user and an ended term get nothing", () => {
    assert.equal(can(null, "content.view", sk, NOW), false);
    assert.equal(can({ ...secretary, active: false }, "content.edit", sk, NOW), false);
    const former = actor("old", { role: "barangay_admin", site: "camantiles", endsAt: new Date("2026-01-01T00:00:00Z") });
    assert.equal(can(former, "content.edit", sk, NOW), false);
  });

  test("a user with two assignments gets both and no more", () => {
    const teacher = actor(
      "both",
      { role: "section_editor", site: "camantiles", scope: "high-school" },
      { role: "section_editor", site: "camantiles", scope: "sk" },
    );
    assert.equal(can(teacher, "content.edit", sk, NOW), true);
    assert.equal(can(teacher, "content.edit", highSchool, NOW), true);
    assert.equal(can(teacher, "content.edit", hall, NOW), false);
  });

  test("super admin can do anything", () => {
    assert.equal(can(superAdmin, "users.manage", { site: "nancayasan" }, NOW), true);
    assert.equal(can(superAdmin, "content.delete", { ...sk, status: "published" }, NOW), true);
  });
});

describe("sitesFor", () => {
  test("lists the barangays a user belongs to", () => {
    assert.deepEqual(sitesFor(skEditor, NOW), ["camantiles"]);
    assert.equal(sitesFor(cityAdmin, NOW), "*");
    assert.deepEqual(sitesFor(null, NOW), []);
  });
});

describe("canSomewhere", () => {
  test("says whether an action is open to the user in any of their places", async () => {
    const { canSomewhere } = await import("./can.ts");
    assert.equal(canSomewhere(skEditor, "content.view", NOW), true);
    assert.equal(canSomewhere(skEditor, "users.manage", NOW), false);
    assert.equal(canSomewhere(hallEditor, "content.edit", NOW), true);
    assert.equal(canSomewhere(captain, "content.edit", NOW), false);
    assert.equal(canSomewhere(captain, "activity.view", NOW), true);
    assert.equal(canSomewhere(secretary, "users.manage", NOW), true);
    assert.equal(canSomewhere(superAdmin, "users.manage", NOW), true);
    assert.equal(canSomewhere(null, "content.view", NOW), false);
  });
});
