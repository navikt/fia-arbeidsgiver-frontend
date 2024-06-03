import { vertTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { Page, expect } from "@playwright/test";

async function gåTilResultater(page: Page) {
  await page.getByRole("button", { name: "Vis alle resultater" }).click();
  await page.getByRole("button", { name: "Fullfør" }).click();
  await expect(page.locator("body")).toContainText("flere valg er mulig");
}

test.describe("Vert/resultatside", () => {
  test("Screenshot av innhold likner", async ({ page }) => {
    await gåTilResultater(page);
    await expect(page).toHaveScreenshot("resultat.png");
  });

  test("test av axe", async ({ page }) => {
    await gåTilResultater(page);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
