import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

test.describe("Gruppering av test", () => {
  test("første test for å sjekke at noe funker", async ({ page }) => {
    await page.goto("http://localhost:2222");
    await page.getByPlaceholder("Enter any user/subject").click();
    await page.getByPlaceholder("Enter any user/subject").fill("asdf");
    await page.getByPlaceholder("Enter any user/subject").press("Enter");

    await page.getByRole("button", { name: "Kom i gang" }).click();
    await page.getByRole("button", { name: "Lukk" }).click();

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

  test("test av axe", async ({ page }) => {
    await page.goto("http://localhost:2222");
    await page.getByPlaceholder("Enter any user/subject").click();
    await page.getByPlaceholder("Enter any user/subject").fill("asdf");
    await page.getByPlaceholder("Enter any user/subject").press("Enter");

    await page.getByRole("button", { name: "Kom i gang" }).click();
    await page.getByRole("button", { name: "Lukk" }).click();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
