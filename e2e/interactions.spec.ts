import { expect, test } from "@playwright/test";

test("the language switch keeps you on the same page", async ({ page }) => {
  await page.goto("/en/health");
  await page.getByRole("link", { name: "Filipino" }).click();
  await expect(page).toHaveURL(/\/fil\/health$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fil");
  await page.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en\/health$/);
});

test("announcements can be filtered by category", async ({ page }) => {
  await page.goto("/en/barangay-hall");
  const filters = page.getByRole("group", { name: "Filter announcements" });
  const rows = page.locator("[data-slot=card]:visible").filter({ has: page.locator("h3") });
  const all = await rows.count();
  expect(all).toBeGreaterThan(2);

  await filters.getByRole("button", { name: "SK", exact: true }).click();
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText("Inter-Purok Basketball League");

  await filters.getByRole("button", { name: "All", exact: true }).click();
  await expect(rows).toHaveCount(all);
});

test("an announcement opens its own page", async ({ page }) => {
  await page.goto("/en/barangay-hall");
  await page.getByRole("link", { name: "Read announcement" }).click();
  await expect(page).toHaveURL(/\/announcements\/general-barangay-assembly$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("General Barangay Assembly");
});

test("carousel arrows scroll the row", async ({ page }) => {
  await page.goto("/en/schools/high-school");
  const track = page.getByRole("group", { name: /meet the whole team/ });
  await track.scrollIntoViewIfNeeded();
  const before = await track.evaluate((el) => el.scrollLeft);
  await page.getByRole("button", { name: "Next staff" }).click();
  await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(before);
});

test("class sections can be narrowed to one grade", async ({ page }) => {
  await page.goto("/en/schools/elementary-school");
  const track = page.getByRole("group", { name: /Pick a grade/ });
  await expect(track.locator("[data-slot=card]")).toHaveCount(15);
  await page
    .getByRole("group", { name: "Filter sections by grade" })
    .getByRole("button", { name: "Grade 5" })
    .click();
  await expect(track.locator("[data-slot=card]")).toHaveCount(3);
});

test("past homecomings switch by year", async ({ page }) => {
  await page.goto("/en/schools/high-school");
  const years = page.getByRole("group", { name: "Choose a homecoming year" });
  await years.getByRole("button", { name: "Homecoming 2023" }).click();
  await expect(years.getByRole("button", { name: "Homecoming 2023" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test.describe("navigation", () => {
  test("the menu reaches every section", async ({ page, isMobile }) => {
    await page.goto("/en");
    if (isMobile) {
      await page.getByRole("button", { name: "Open menu" }).click();
      const menu = page.getByRole("navigation", { name: "Menu" });
      await expect(menu).toBeVisible();
      await menu.getByRole("link", { name: "High School" }).click();
      await expect(page).toHaveURL(/\/en\/schools\/high-school$/);
      await expect(menu).toBeHidden();
    } else {
      const nav = page.getByRole("navigation", { name: "Main" });
      await nav.getByRole("button", { name: "Schools menu" }).click();
      await nav.getByRole("link", { name: /^High School/ }).click();
      await expect(page).toHaveURL(/\/en\/schools\/high-school$/);
    }
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Camantiles High School");
  });

  test("the mobile menu closes with Escape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "phone layout only");
    await page.goto("/en");
    const button = page.getByRole("button", { name: "Open menu" });
    await button.click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("navigation", { name: "Menu" })).toBeHidden();
    await expect(button).toBeFocused();
  });
});
