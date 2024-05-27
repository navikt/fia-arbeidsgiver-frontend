import { deltakerTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";

test.describe("Deltaker/ferdigside", () => {
  test("rett innhold blir tegnet opp", async ({ page }) => {
    await page.goto(
      "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker/ferdig",
    );
    await expect(page.getByRole("main")).toContainText(
      "Fullført!Takk for din deltakelse 🎉Du kan nå lukke denne siden.",
    );
  });

  test("test av axe", async ({ page }) => {
    await page.goto(
      "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker/ferdig",
    );

    await expect(page.getByRole("main")).toContainText(
      "Fullført!Takk for din deltakelse 🎉Du kan nå lukke denne siden.",
    );
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
