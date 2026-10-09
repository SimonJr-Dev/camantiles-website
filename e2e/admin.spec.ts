import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Sample accounts created by scripts/seed.mjs --demo.
const ADMIN = { email: "admin@camantiles.local", password: "password" };
const SK_EDITOR = { email: "sk@camantiles.local", password: "password" };
const APPROVER = { email: "captain@camantiles.local", password: "password" };
const FAILED = "That email and password do not match an account.";

async function signIn(page: Page, account: { email: string; password: string }) {
  await page.goto("/admin/sign-in");
  await page.getByLabel("Email").fill(account.email);
  await page.getByLabel("Password", { exact: true }).fill(account.password);
  await page.getByRole("button", { name: "Sign in" }).click();
}

/** On a phone the menu is behind a button; on a wide screen it is always showing. */
async function openMenu(page: Page, isMobile: boolean) {
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
}

async function expectAccessible(page: Page) {
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const summary = scan.violations.map(
    (violation) =>
      `${violation.id}: ${violation.help}\n    ${violation.nodes
        .slice(0, 3)
        .map((node) => node.target.join(" "))
        .join("\n    ")}`,
  );
  expect(summary, summary.join("\n")).toEqual([]);
}

test("the staff area sends visitors who are not signed in to the sign-in page", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/sign-in$/);
  await expect(page.getByRole("heading", { name: "Staff sign in" })).toBeVisible();
  await expectAccessible(page);
});

test("a wrong password is refused without saying which part was wrong", async ({ page }) => {
  await signIn(page, { email: ADMIN.email, password: "not-the-password" });
  await expect(page.locator("form [role=alert]")).toHaveText(FAILED);
  await expect(page).toHaveURL(/\/admin\/sign-in$/);
  // The email is kept so only the password needs retyping.
  await expect(page.getByLabel("Email")).toHaveValue(ADMIN.email);

  await signIn(page, { email: "nobody@camantiles.local", password: "not-the-password" });
  await expect(page.locator("form [role=alert]")).toHaveText(FAILED);
});

test("the password can be shown while typing", async ({ page }) => {
  await page.goto("/admin/sign-in");
  const password = page.getByLabel("Password", { exact: true });
  await password.fill("secret");
  await expect(password).toHaveAttribute("type", "password");
  await page.getByRole("button", { name: "Show password" }).click();
  await expect(password).toHaveAttribute("type", "text");
  await page.getByRole("button", { name: "Hide password" }).click();
  await expect(password).toHaveAttribute("type", "password");
});

test("an admin signs in, sees their access, and signs out", async ({ page, isMobile }) => {
  await signIn(page, ADMIN);
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Welcome, Super Admin");
  const access = page.getByRole("list", { name: "Your access" }).getByRole("listitem");
  await expect(access).toHaveCount(1);
  await expect(access).toContainText("Super Admin");
  await expect(access).toContainText("All sites");
  await expectAccessible(page);

  await openMenu(page, isMobile);
  await expectAccessible(page);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/admin\/sign-in$/);
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/sign-in$/);
});

test("a section editor sees only their own section and no admin menu", async ({ page, isMobile }) => {
  await signIn(page, SK_EDITOR);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Welcome, Demo SK Editor");
  await expect(page.getByText("You can write content and send it for approval.")).toBeVisible();
  const access = page.getByRole("list", { name: "Your access" }).getByRole("listitem");
  await expect(access).toHaveCount(1);
  await expect(access).toContainText("Section Editor");
  await expect(access).toContainText("Barangay Camantiles · Sangguniang Kabataan");

  await openMenu(page, isMobile);
  const menu = page.getByRole("navigation", { name: "Staff area" }).locator("visible=true");
  await expect(menu.getByText("Announcements")).toBeVisible();
  await expect(menu.getByText("Users")).toHaveCount(0);
  await expect(menu.getByText("Activity")).toHaveCount(0);
});

test("an approver is told they publish, and can see the activity entry", async ({ page, isMobile }) => {
  await signIn(page, APPROVER);
  await expect(page.getByText("You approve and publish what others have written.")).toBeVisible();
  await openMenu(page, isMobile);
  const menu = page.getByRole("navigation", { name: "Staff area" }).locator("visible=true");
  await expect(menu.getByText("Activity")).toBeVisible();
  await expect(menu.getByText("Users")).toHaveCount(0);
});

test("the phone menu closes with Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "phone layout only");
  await signIn(page, ADMIN);
  const button = page.getByRole("button", { name: "Open menu" });
  await button.click();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Sign out" })).toBeHidden();
});

test("the public site has no sign-up and does not link to the staff area", async ({ page, request }) => {
  await page.goto("/en");
  await expect(page.locator('a[href^="/admin"]')).toHaveCount(0);

  const response = await request.post("/api/auth/sign-up/email", {
    data: { name: "Intruder", email: "intruder@example.com", password: "a-long-enough-password" },
  });
  expect(response.ok()).toBe(false);
});
