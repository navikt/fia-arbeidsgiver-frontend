import { vertTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { Page, expect } from "@playwright/test";

async function gåTilResultater(page: Page) {
  await page.getByRole("button", { name: "Start" }).first().click();
  await expect(page.locator("body")).toContainText(
    "Som deltaker i partssamarbeidet har du en viktig rolle",
  );

  await page.getByRole("button", { name: "Start" }).click();
  const visResultater = page.getByRole("button", {
    name: "Fullfør og vis resultat",
  });
  await expect(visResultater).toBeVisible();
  await visResultater.click();
  await page
    .getByRole("button", { name: "Fullfør", exact: true })
    .click({ timeout: 10000 });

  await expect(page.locator("body")).toContainText("flere valg er mulig");
}

test.describe("Vert/delresultatside", () => {
  test("Screenshot av innhold likner", async ({ page }) => {
    await gåTilResultater(page);
    await expect(page).toHaveScreenshot("delresultat.png");
  });

  test("test av axe", async ({ page }) => {
    await gåTilResultater(page);
    await expect(page.locator("body")).toContainText("Gå til neste tema"); //Vent på at siden er lastet.
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
