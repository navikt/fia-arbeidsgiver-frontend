import { vertTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { Page, expect } from "@playwright/test";
import { Page as CorePage } from "playwright-core";

// @ts-ignore
import { partssamarbeid, spørreundersøkelseId } from "@/utils/dummydata";
const temaId = partssamarbeid.id;

async function gåTilResultater(page: Page) {
  await page.getByRole("button", { name: "Start" }).first().click();
  await expect(page.locator("body")).toContainText(
    "Et velfungerende partssamarbeid verdsetter og utnytter hverandres ",
  );

  await page.getByRole("button", { name: "Start" }).click();
  const visResultater = page.getByRole("button", {
    name: "Fullfør og vis resultatene",
  });
  await expect(visResultater).toBeVisible();
  await visResultater.click();

  await page
    .getByRole("button", { name: "Fullfør", exact: true })
    .click({ timeout: 10000 });

  await expect(page.locator("body")).toContainText(
    "Hvordan opplever du at partssamarbeidet har utviklet seg i løpet av samarbeidsperioden?",
  );
}

test.describe("Vert/delresultatside", () => {
  test.beforeEach(({ page }) => {
    page.unroute(
      `http://localhost:2222/api/${spørreundersøkelseId}/vert/tema/${temaId}`,
    );
  });
  test("Screenshot av innhold likner", async ({ page }) => {
    await gåTilResultater(page);
    await expect(page).toHaveScreenshot({ fullPage: true });
  });

  test("Viser feilmelding når det er problemer med å hente temaoversikt", async ({
    page,
  }) => {
    await gåTilResultater(page);
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/vert/tema/${temaId}`,
      async (route) => {
        await route.fulfill({ status: 303 });
      },
    );

    await page.reload();
    await expect(
      page.getByText(`Kunne ikke laste tema ${temaId}`),
    ).toBeVisible();
  });

  test("Viser feilmelding når det er problemer med å hente temaresultat", async ({
    page,
  }) => {
    // TODO: Fjern denne når vi får fikset at beckend sender error første gang
    test.setTimeout(90000);
    await gåTilResultater(page);
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/vert/tema/${temaId}/resultater`,
      async (route) => {
        await route.fulfill({ status: 303 });
      },
    );

    // TODO: Fjern denne når vi får fikset at beckend sender error første gang
    await expect(
      page.getByText("Kunne ikke laste resultater for tema"),
    ).toBeVisible({ timeout: 60000 });
  });

  test("Sjekker at accessibility-tree er i orden", async ({ page }) => {
    await gåTilResultater(page);
    await expect(page.locator("body")).toContainText("Gå til oversikt");
    await expect(page.getByRole("main")).toMatchAriaSnapshot(`
      - main:
        - text: "Demoutgave: Dette er en demoside for å teste ut ny funksjonalitet. Den skal ikke brukes med ekte virksomheter."
        - button "Gå til oversikt"
        - button "Vis QR-kode"
        - heading "Partssamarbeid" [level=1]
        - button "Gå til neste tema"
        - radiogroup "Hvis du bruker skjermleser, bør du velge tabell":
          - radio "Graf" [checked]
          - radio "Tabell"
        - paragraph: Utvikle partssamarbeidet
        - table "Hvordan opplever du at partssamarbeidet har utviklet seg i løpet av samarbeidsperioden?":
          - rowgroup:
            - row "Svar Antall svar Prosent":
              - columnheader "Svar"
              - columnheader "Antall svar"
              - columnheader "Prosent"
          - rowgroup:
            - row /Svært bra 1 \\d+\\.\\d+%/:
              - cell "Svært bra"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Bra 1 \\d+\\.\\d+%/:
              - cell "Bra"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Dårlig 1 \\d+\\.\\d+%/:
              - cell "Dårlig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Svært dårlig 1 \\d+\\.\\d+%/:
              - cell "Svært dårlig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Vet ikke 1 \\d+\\.\\d+%/:
              - cell "Vet ikke"
              - cell "1"
              - cell /\\d+\\.\\d+%/
        - paragraph: Utvikle partssamarbeidet
        - table "Som leder, tillitsvalgt eller verneombud har jeg fått en bedre forståelse av min rolle og mine ansvarsområder i partssamarbeidet":
          - rowgroup:
            - row "Svar Antall svar Prosent":
              - columnheader "Svar"
              - columnheader "Antall svar"
              - columnheader "Prosent"
          - rowgroup:
            - row /Enig 1 \\d+\\.\\d+%/:
              - cell "Enig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Litt enig 1 \\d+\\.\\d+%/:
              - cell "Litt enig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Litt uenig 1 \\d+\\.\\d+%/:
              - cell "Litt uenig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Uenig 1 \\d+\\.\\d+%/:
              - cell "Uenig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Vet ikke 1 \\d+\\.\\d+%/:
              - cell "Vet ikke"
              - cell "1"
              - cell /\\d+\\.\\d+%/
        - paragraph: Utvikle partssamarbeidet
        - table "Vi har opparbeidet oss nødvendig kompetanse for å forebygge og håndtere sykefraværet vårt":
          - rowgroup:
            - row "Svar Antall svar Prosent":
              - columnheader "Svar"
              - columnheader "Antall svar"
              - columnheader "Prosent"
          - rowgroup:
            - row /Enig 1 \\d+\\.\\d+%/:
              - cell "Enig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Litt enig 1 \\d+\\.\\d+%/:
              - cell "Litt enig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Litt uenig 1 \\d+\\.\\d+%/:
              - cell "Litt uenig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Uenig 1 \\d+\\.\\d+%/:
              - cell "Uenig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Vet ikke 1 \\d+\\.\\d+%/:
              - cell "Vet ikke"
              - cell "1"
              - cell /\\d+\\.\\d+%/
        - paragraph: Veien videre
        - table "Vi har laget konkrete planer for hvordan vi i partssamarbeidet skal jobbe fremover":
          - rowgroup:
            - row "Svar Antall svar Prosent":
              - columnheader "Svar"
              - columnheader "Antall svar"
              - columnheader "Prosent"
          - rowgroup:
            - row /Enig 1 \\d+\\.\\d+%/:
              - cell "Enig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Litt enig 1 \\d+\\.\\d+%/:
              - cell "Litt enig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Litt uenig 1 \\d+\\.\\d+%/:
              - cell "Litt uenig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Uenig 1 \\d+\\.\\d+%/:
              - cell "Uenig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Vet ikke 1 \\d+\\.\\d+%/:
              - cell "Vet ikke"
              - cell "1"
              - cell /\\d+\\.\\d+%/
        - paragraph: Veien videre
        - table "Jeg opplever at vi er motiverte for å samarbeide videre om sykefravær og arbeidsmiljø":
          - rowgroup:
            - row "Svar Antall svar Prosent":
              - columnheader "Svar"
              - columnheader "Antall svar"
              - columnheader "Prosent"
          - rowgroup:
            - row /Enig 1 \\d+\\.\\d+%/:
              - cell "Enig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Litt enig 1 \\d+\\.\\d+%/:
              - cell "Litt enig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Litt uenig 1 \\d+\\.\\d+%/:
              - cell "Litt uenig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Uenig 1 \\d+\\.\\d+%/:
              - cell "Uenig"
              - cell "1"
              - cell /\\d+\\.\\d+%/
            - row /Vet ikke 1 \\d+\\.\\d+%/:
              - cell "Vet ikke"
              - cell "1"
              - cell /\\d+\\.\\d+%/
    `);
  });

  test("test av axe", async ({ page }) => {
    await gåTilResultater(page);
    await expect(page.locator("body")).toContainText("Gå til oversikt"); //Vent på at siden er lastet.
    const accessibilityScanResults = await new AxeBuilder({
      page: page as CorePage,
    }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
