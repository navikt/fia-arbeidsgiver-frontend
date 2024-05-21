import { vertTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";

test.describe("Vert/startside", () => {
  test("rett innhold blir tegnet opp", async ({ page }) => {
    await page.getByRole("button", { name: "Avslutt" }).click();
    await expect(page.locator("body")).toContainText("Fullført!");
    await page.getByText("Bra jobbet!").click();
    await expect(page.locator("body")).toContainText("Bra jobbet!");
  });

  test("test av axe", async ({ page }) => {
    await page.getByRole("button", { name: "Avslutt" }).click();
    await expect(page.locator("body")).toContainText("Fullført!"); //Vent på at siden er lastet.
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
