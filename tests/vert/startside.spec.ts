import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
import { test as base } from "@playwright/test";
import { Page } from "playwright-core";

// Må override, da den i playwrighUtils.ts er satt til å hoppe forbi denne siden.
const test = base.extend<object>({
  page: async ({ page }, use) => {
    await page.goto("http://localhost:2222");
    await page.getByPlaceholder("Enter any user/subject").click();
    await page.getByPlaceholder("Enter any user/subject").fill("asdf");
    await page.getByPlaceholder("Enter any user/subject").press("Enter");
    await use(page);
  },
});

test.describe("Vert/startside", () => {
  test("rett innhold blir tegnet opp", async ({ page }) => {
    await expect(page.locator("h1")).toContainText(
      "Velkommen, Fisk og flesk AS",
    );
    await expect(page.getByRole("main")).toContainText(
      "Psst! Har du med mobiltelefonen din?",
    );
    await expect(page.getByRole("main")).toContainText(
      "Inkluderende arbeidsliv handler om å:",
    );
    await expect(page.getByRole("main")).toContainText(
      "samarbeide for en mer inkluderende arbeidsplass",
    );
    await expect(page.getByRole("main")).toContainText(
      "jobbe systematisk med sykefraværsarbeid",
    );
    await expect(page.getByRole("main")).toContainText(
      "jobbe forebyggende med arbeidsmiljø",
    );
  });

  test("Klikk på start behovsvurderingen", async ({ page }) => {
    await page.getByRole("button", { name: "Start behovsvurderingen" }).click();
    await expect(page.getByRole("main")).toContainText(
      "Hvordan gjennomfører vi behovsvurderingen?",
    );
  });

  test("Screenshot av innhold likner", async ({ page }) => {
    await expect(page.locator("h1")).toContainText(
      "Velkommen, Fisk og flesk AS",
    );
    await expect(page).toHaveScreenshot({ fullPage: true });
  });

  test("Sjekker at accessibility-tree er i orden", async ({ page }) => {
    await expect(page.locator("h1")).toContainText(
      "Velkommen, Fisk og flesk AS",
    );
    await expect(page.getByRole("main")).toMatchAriaSnapshot(`
      - main:
        - text: "Demoutgave: Dette er en demoside for å teste ut ny funksjonalitet. Den skal ikke brukes med ekte virksomheter. Psst! Har du med mobiltelefonen din?"
        - img
        - heading "Velkommen, Fisk og flesk AS" [level=1]
        - button "Start behovsvurderingen"
        - paragraph: "Inkluderende arbeidsliv handler om å:"
        - paragraph: samarbeide for en mer inkluderende arbeidsplass
        - paragraph: jobbe systematisk med sykefraværsarbeid
        - paragraph: jobbe forebyggende med arbeidsmiljø
    `);
  });

  test("test av axe", async ({ page }) => {
    await expect(page.locator("h1")).toContainText(
      "Velkommen, Fisk og flesk AS",
    ); //Vent på at siden er lastet.
    const accessibilityScanResults = await new AxeBuilder({
      page: page as Page,
    }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
