import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
import { test as base } from "@playwright/test";

// Må override, da den i playwrighUtils.ts er satt til å hoppe forbi denne siden.
const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto("http://localhost:2222");
    await page.getByPlaceholder("Enter any user/subject").click();
    await page.getByPlaceholder("Enter any user/subject").fill("asdf");
    await page.getByPlaceholder("Enter any user/subject").press("Enter");
    await page.getByRole("button", { name: "Start behovsvurdering" }).click();
    await use(page);
  },
});

test.describe("Vert/introside", () => {
  test("rett innhold blir tegnet opp", async ({ page }) => {
    await expect(page.locator("h1")).toContainText(
      "Velkommen, Fisk og flesk AS",
    );
    await expect(page.getByRole("main")).toContainText(
      "Få en felles forståelse for hvordan dere samarbeider om sykefravær og arbeidsmiljø i dag.",
    );
    await expect(page.getByRole("main")).toContainText(
      "Avklare hvilke behov dere har og hva som bør være fokus fremover.",
    );
    await expect(page.getByRole("main")).toContainText(
      "Hvordan gjennomfører vi behovsvurderingen?",
    );
  });

  test("Klikk på kom i gang", async ({ page }) => {
    await page.getByRole("button", { name: "Kom i gang" }).click();
    await page.getByRole("button", { name: "Lukk" }).click();
    await expect(page.getByRole("main")).toContainText("Partssamarbeid");
  });

  test("test av axe", async ({ page }) => {
    await expect(page.locator("h1")).toContainText(
      "Velkommen, Fisk og flesk AS",
    ); //Vent på at siden er lastet.
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
