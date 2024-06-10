import { test, expect } from "@playwright/test";

test.describe("screenshots", () => {
  test("Screenshot av innhold likner", async ({ page }) => {
    await page.goto("http://localhost:3000/screenshot-test");

    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
