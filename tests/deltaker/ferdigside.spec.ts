import { deltakerTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";

// @ts-ignore
import { partssamarbeid, spørreundersøkelseId, helSpørreundersøkelse } from "@/utils/dummydata";
const førsteSpørsmålId = partssamarbeid.spørsmål[0].id;
const førsteTemaId = partssamarbeid.id;

test.describe("Deltaker/ferdigside", () => {
    test.beforeEach(async ({ page }) => {
      page.unroute(`http://localhost:2222/api/${spørreundersøkelseId}/deltaker`);
      page.unroute(
        `http://localhost:2222/api/${spørreundersøkelseId}/deltaker/tema/${førsteTemaId}/sporsmal/${førsteSpørsmålId}/svar`,
      );
      page.unroute(
        `http://localhost:2222/api/${spørreundersøkelseId}/deltaker/tema/${førsteTemaId}/sporsmal/${førsteSpørsmålId}`,
      );

      for (let i = 0; i < helSpørreundersøkelse.length; i++) {
        const tema = helSpørreundersøkelse[i];
  
        for (let j = 0; j < tema.spørsmål.length; j++) {
          const element = tema.spørsmål[j];
    
          await expect(page.getByText(element.tekst)).toBeVisible();
    
          await page.getByText(element.svaralternativer[(j%element.svaralternativer.length)].tekst).click();
          await page.getByRole("button", { name: "Svar" }).click();
        }
      }
    });

  test("rett innhold blir tegnet opp", async ({ page }) => {
    await expect(page.getByRole('main')).toContainText('Takk!Din rolle i partssamarbeidet er viktig for å skape engasjement og gode arbeidsforhold på arbeidsplassenTakk for din deltakelse,du kan nå lukke denne siden.');
  });
  
  
  test("Sjekker at accessibility-tree er i orden", async ({ page }) => {
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
      - heading "Takk!" [level=1]
      - paragraph: Din rolle i partssamarbeidet er viktig for å skape engasjement og gode arbeidsforhold på arbeidsplassen
      - paragraph: Takk for din deltakelse, du kan nå lukke denne siden.
      `);
  });
  

  test.fixme("test av axe", async ({ page }) => {
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
