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
    await page.getByRole("button", { name: "Start behovsvurderingen" }).click();
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
        - text: "Demoutgave: Dette er en demoside for å teste ut ny funksjonalitet. Den skal ikke brukes med ekte virksomheter."
        - heading "Behovsvurdering" [level=1]
        - button "Kom i gang"
        - heading "Hva er målet?" [level=2]
        - list:
          - listitem: Få en felles forståelse for hvordan dere samarbeider om sykefravær og arbeidsmiljø i dag.
          - listitem: Avklare hvilke behov dere har og hva som bør være fokus fremover.
        - heading "Hvordan gjennomfører vi behovsvurderingen?" [level=2]
        - list:
          - listitem: Vi skal diskutere temaene partssamarbeid, sykefraværsarbeid og arbeidsmiljø.
          - listitem: Alle svarer individuelt på spørsmål før vi reflekterer og diskuterer resultatene i fellesskap.
        - heading "Hva skjer med resultatene?" [level=2]
        - list:
          - listitem: Resultatene deles kun med dere og det registreres ikke hvem som har svart hva.
          - listitem: På Min side - Arbeidsgiver blir behovsvurderingen og andre samarbeidsdokumenter tilgjengelig.
          - listitem: Nav bruker anonymisert statistikk for å videreutvikle tjenesten.
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
