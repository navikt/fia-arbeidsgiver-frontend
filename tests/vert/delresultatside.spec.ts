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
        - img "Hvordan opplever du at partssamarbeidet harutviklet seg i løpet av samarbeidsperioden?": Antall svarHvordan opplever du at partssamarbeidet harutviklet seg i løpet av samarbeidsperioden?Svært braBraDårligSvært dårligVet ikke012
        - paragraph: Utvikle partssamarbeidet
        - img "Som leder, tillitsvalgt eller verneombud har jegfått en bedre forståelse av min rolle og mineansvarsområder i partssamarbeidet": Antall svarSom leder, tillitsvalgt eller verneombud har jegfått en bedre forståelse av min rolle og mineansvarsområder i partssamarbeidetEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Utvikle partssamarbeidet
        - img "Vi har opparbeidet oss nødvendig kompetanse for å forebygge og håndtere sykefraværet vårt": Antall svarVi har opparbeidet oss nødvendig kompetanse for å forebygge og håndtere sykefraværet vårt(flere valg er mulig)012EnigLitt enigLitt uenigUenigVet ikke
        - paragraph: Veien videre
        - img "Vi har laget konkrete planer for hvordan vi ipartssamarbeidet skal jobbe fremover": Antall svarVi har laget konkrete planer for hvordan vi ipartssamarbeidet skal jobbe fremoverEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Veien videre
        - img "Jeg opplever at vi er motiverte for å samarbeidevidere om sykefravær og arbeidsmiljø": Antall svarJeg opplever at vi er motiverte for å samarbeidevidere om sykefravær og arbeidsmiljøEnigLitt enigLitt uenigUenigVet ikke012
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
