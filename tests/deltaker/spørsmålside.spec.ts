import { deltakerTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";

// @ts-ignore
import { partssamarbeid, spørreundersøkelseId, helSpørreundersøkelse } from "@/utils/dummydata";
import { SvaralternativDto } from "@/app/_types/SvaralternativDto";
const førsteSpørsmålId = partssamarbeid.spørsmål[0].id;
const førsteTemaId = partssamarbeid.id;

test.describe("Deltaker/spørsmålside", () => {
  test.beforeEach(({ page }) => {
    page.unroute(`http://localhost:2222/api/${spørreundersøkelseId}/deltaker`);
    page.unroute(
      `http://localhost:2222/api/${spørreundersøkelseId}/deltaker/tema/${førsteTemaId}/sporsmal/${førsteSpørsmålId}/svar`,
    );
    page.unroute(
      `http://localhost:2222/api/${spørreundersøkelseId}/deltaker/tema/${førsteTemaId}/sporsmal/${førsteSpørsmålId}`,
    );
  });

  test("rett innhold blir tegnet opp", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: partssamarbeid.navn }),
    ).toBeVisible();
    await expect(page.getByText(partssamarbeid.spørsmål[0].tekst)).toBeVisible();
    await expect(
      page.getByText(
        partssamarbeid.spørsmål[0].svaralternativer
          .map((svaralternativ: SvaralternativDto) => svaralternativ.tekst)
          .join(""),
      ),
    ).toBeVisible();
    await expect(page.getByRole("group")).toContainText(
      partssamarbeid.spørsmål[0].svaralternativer
        .map((svaralternativ: SvaralternativDto) => svaralternativ.tekst)
        .join(""),
    );
    await expect(page.getByRole("button")).toContainText("Svar");
  });

  test("havner på ferdigside til slutt", async ({ page }) => {
    for (let i = 0; i < helSpørreundersøkelse.length; i++) {
      const tema = helSpørreundersøkelse[i];

      for (let j = 0; j < tema.spørsmål.length; j++) {
        const element = tema.spørsmål[j];
  
        await expect(page.getByText(element.tekst)).toBeVisible();
  
        await page.getByText(element.svaralternativer[(j%element.svaralternativer.length)].tekst, {exact: true}).click();
        await page.getByRole("button", { name: "Svar" }).click();
      }
    }

    //TODO: Nytt tema, ikke ferdigside kommer opp med nye testdata
    // await expect(page.getByText("Vi jobber systematisk for å forebygge sykefravær")).toBeVisible();
    await expect(page.getByRole('main')).toContainText('Takk!Din rolle i partssamarbeidet er viktig for å skape engasjement og gode arbeidsforhold på arbeidsplassenTakk for din deltakelse,du kan nå lukke denne siden.');
  });

  test("Viser feilmelding ved feil i sendSvar", async ({ page }) => {
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/deltaker/tema/${førsteTemaId}/sporsmal/${førsteSpørsmålId}/svar`,
      async (route) => {
        await route.fulfill({ status: 400 });
      },
    );

    await page.getByText("Bra", {exact: true}).first().click();
    await page.getByRole("button", { name: "Svar" }).click();
    await expect(
      page.getByText("Kunne ikke sende svar, prøv igjen"),
    ).toBeVisible();

    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/deltaker/tema/${førsteTemaId}/sporsmal/${førsteSpørsmålId}/svar`,
      async (route) => {
        await route.fulfill({ status: 302 });
      },
    );

    await page.getByText("Bra", {exact: true}).first().click();
    await page.getByRole("button", { name: "Svar" }).click();
    await expect(
      page.getByText("Noe gikk galt. Prøv å laste siden på nytt."),
    ).toBeVisible();
  });

  test("Viser feilmelding ved lukket spørsmål og feil i fetchIdentifiserbartSpørsmål", async ({
    page,
  }) => {
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/deltaker/tema/${førsteTemaId}/sporsmal/${førsteSpørsmålId}/svar`,
      async (route) => {
        await route.fulfill({ status: 303 });
      },
    );

    await page.getByText("Bra", {exact: true}).first().click();
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/deltaker`,
      async (route) => {
        await route.fulfill({ status: 303 });
      },
    );
    await page.getByRole("button", { name: "Svar" }).click();
    await expect(
      page.getByText("Noe gikk galt med henting av neste spørsmål."),
    ).toBeVisible();
  });

  test("Viser feilmelding fra useSpørsmålOgSvar", async ({ page }) => {
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/deltaker/tema/${førsteTemaId}/sporsmal/${førsteSpørsmålId}`,
      async (route) => {
        await route.fulfill({ status: 302 });
      },
    );

    await expect(
      page.getByText("Noe gikk galt. Prøv å laste siden på nytt."),
    ).toBeVisible();
  });

  test("Sjekker at accessibility-tree er i orden", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: partssamarbeid.navn }),
    ).toBeVisible();
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
      - main:
        - heading "Partssamarbeid" [level=1]
        - text: Spørsmål 1 av 5
        - group "Hvordan opplever du at partssamarbeidet har utviklet seg i løpet av samarbeidsperioden?":
          - radio "Svært bra"
          - radio "Bra"
          - radio "Dårlig"
          - radio "Svært dårlig"
          - radio "Vet ikke"
        - button "Svar"
    `);
    });

  test("Bruker valgt svaralternativ fra cookieHandler", async ({page}) => {
    await expect(
      page.getByRole("heading", { name: partssamarbeid.navn }),
    ).toBeVisible();

    await page.getByLabel('Svært bra').check();
    await page.getByRole('button', { name: 'Svar' }).click();
    await page.getByRole('button', { name: 'Tilbake' }).click();
    await expect(page.getByLabel('Svært bra')).toBeChecked();
  });

  test("test av axe", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    //TODO: Får feil på svg her.
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
