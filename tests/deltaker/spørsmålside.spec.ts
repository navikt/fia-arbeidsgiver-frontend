import { deltakerTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";

// @ts-ignore
import { partssamarbeid, spørreundersøkelseId } from "@/utils/dummydata";
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

  test.fixme("havner på ferdigside til slutt", async ({ page }) => {
    await page.getByText("Enig").first().click();
    await page.getByRole("button", { name: "Svar" }).click();
    await page.getByLabel("Lønnsforhandlinger").check();
    await page.getByRole("button", { name: "Svar" }).click();
    await page.getByText("Svært bra").click();
    await page.getByRole("button", { name: "Svar" }).click();
    await page.getByText("Enig").first().click();
    await page.getByRole("button", { name: "Svar" }).click();

    //TODO: Nytt tema, ikke ferdigside kommer opp med nye testdata
    // await expect(page.getByText("Vi jobber systematisk for å forebygge sykefravær")).toBeVisible();
    await expect(page.getByRole("main")).toContainText(
      "Fullført!Takk for din deltakelse 🎉Du kan nå lukke denne siden.",
    );
  });

  test("Viser feilmelding ved feil i sendSvar", async ({ page }) => {
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/deltaker/tema/${førsteTemaId}/sporsmal/${førsteSpørsmålId}/svar`,
      async (route) => {
        await route.fulfill({ status: 400 });
      },
    );

    await page.getByText("Godt").first().click();
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

    await page.getByText("Godt").first().click();
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

    await page.getByText("Godt").first().click();
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
    expect(page.locator("body")).toMatchAriaSnapshot(`
      - main:
        - heading "Partssamarbeid" [level=1]
        - text: Spørsmål 1 av 5
        - paragraph: Utvikle partssamarbeidet
        - group "Hvordan opplever du at partssamarbeidet har utviklet seg i løpet av samarbeidsperioden?":
          - radio "Svært godt": /06740ca9-bb43-\\d+-\\d+-136aa514dbca/
          - radio "Godt": /06740ca9-bb72-74c8-\\d+-8fa6e3e13d06/
          - radio "Dårlig": /06740ca9-bb9b-7b38-\\d+-531d1d0bc046/
          - radio "Svært dårlig": /06740ca9-bbcf-\\d+-\\d+-d6ca1e15516b/
          - radio "Vet ikke": /06740ca9-bbf8-75d7-\\d+-aced076bc15e/
        - button "Svar"
      - alert: Deltaker | Behovsvurdering
    `);
  });

  test.fixme("Bruker valgt svaralternativ fra cookieHandler", () => {
    // TODO: Finn ut av testing av cookieHandler
  });

  test.fixme("test av axe", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    //TODO: Får feil på svg her.
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
