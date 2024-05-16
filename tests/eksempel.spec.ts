import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
import { vertTest } from "@/utils/playwrightUtils";

vertTest.describe("Gruppering av test", () => {
  vertTest("første test for å sjekke at noe funker", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Utvikle partssamarbeidet i" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Start" }).first().click();
    await expect(page.getByRole("list")).toContainText(
      "NAV er opptatt av det utvidede partssamarbeidet. Det betyr samarbeid mellom ledere, tillitsvalgte og verneombud for å utvikle og forbedre arbeidsplassen.",
    );
    await page.getByRole("button", { name: "Start" }).first().click();
    await page
      .getByRole("button", { name: "Resultater Vis resultater" })
      .click();
    await page.getByLabel("Vis resultater").click();

    await expect(
      page.getByRole("button", { name: "Gå til resultat" }),
    ).toBeVisible();
  });

  vertTest("test av axe", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
