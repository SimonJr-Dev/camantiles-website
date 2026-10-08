import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { LOCALES, PATHS } from "./routes";

for (const locale of LOCALES) {
  for (const path of PATHS) {
    const url = `/${locale}${path}`;

    test(`${url} loads and passes the accessibility scan`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));

      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();

      // Nothing sticks out past the screen edge.
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflows, "page scrolls sideways").toBe(false);

      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const summary = scan.violations.map(
        (violation) =>
          `${violation.id} (${violation.nodes.length}): ${violation.help}\n    ${violation.nodes
            .slice(0, 3)
            .map((node) => node.target.join(" "))
            .join("\n    ")}`,
      );
      expect(summary, summary.join("\n")).toEqual([]);
      expect(errors, "errors thrown in the browser").toEqual([]);
    });
  }
}

test("an unknown address shows the not-found page", async ({ page }) => {
  const response = await page.goto("/en/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
});

test("the root address redirects to a language", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(en|fil)$/);
});
