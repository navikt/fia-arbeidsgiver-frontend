import { clearRouteVariants } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
import { test as base } from "@playwright/test";

// Må override, da den i playwrighUtils.ts er satt til å hoppe forbi denne siden.
const test = base.extend({
  page: async ({ page }, use) => {
    await clearRouteVariants();
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
      "Behovsvurdering for IA-samarbeidetMålet for møtet er å sette retning og felles mål for IA-samarbeidet.Vi skal sammen reflektere over hvordan dere jobber med sykefravær og arbeidsmiljø.Vi er her for å hjelpe med utgangspunkt i en felles vurdering av dagens situasjon.Vi skal se på tre temaer; partssamarbeid, sykefraværsarbeid og arbeidsmiljø.Hvert tema introduseres før dere svarer individuelt på spørsmål.Vi ser på resultatene i fellesskap og diskuterer hva som bør vektlegges i samarbeidsperioden.",
    );
    await expect(page.getByRole("main")).toContainText(
      "IA-samarbeidetNAV tilbyr hjelp og kompetanseheving for å forebygge og redusere sykefravær. I en avtalt periode kan vi hjelpe dere med å:samarbeide om arbeidsmiljø og sykefraværøke kvaliteten på sykefraværsarbeidetjobbe forebyggende med arbeidsmiljø",
    );
    await expect(page.getByRole("main")).toContainText(
      "Resultater og personvernAlle svar er anonyme og vi registrerer ikke hvem som har svart hva.Resultatene brukes som grunnlag for samarbeidet og deles kun med dere.NAV bruker kun anonymisert statistikk for å videreutvikle tjenester.",
    );
  });

  test("Klikk på kom i gang", async ({ page }) => {
    await page.getByRole("button", { name: "Kom i gang" }).click();
    await page.getByRole("button", { name: "Lukk" }).click();
    await expect(page.getByRole("main")).toContainText(
      "Utvikle partssamarbeidet i virksomheten",
    );
  });

  test("test av axe", async ({ page }) => {
    await expect(page.locator("h1")).toContainText(
      "Velkommen, Fisk og flesk AS",
    ); //Vent på at siden er lastet.
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
