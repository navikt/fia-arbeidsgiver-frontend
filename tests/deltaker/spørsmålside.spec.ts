import { deltakerTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect, test as baseTest } from "@playwright/test";

import {
  partssamarbeid,
  spørreundersøkelseId,
  helSpørreundersøkelse,
  // @ts-ignore
} from "@/utils/dummydata";
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
    await expect(
      page.getByText(partssamarbeid.spørsmål[0].tekst),
    ).toBeVisible();
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
    await expect(page.getByRole("button", { name: "Svar" })).toBeVisible();
  });

  test("havner på ferdigside til slutt", async ({ page }) => {
    for (let i = 0; i < helSpørreundersøkelse.length; i++) {
      const tema = helSpørreundersøkelse[i];

      for (let j = 0; j < tema.spørsmål.length; j++) {
        const element = tema.spørsmål[j];

        await expect(page.getByText(element.tekst)).toBeVisible();

        await page
          .getByText(
            element.svaralternativer[j % element.svaralternativer.length].tekst,
            { exact: true },
          )
          .click();
        await page.getByRole("button", { name: "Svar" }).click();
      }
    }

    await expect(page.getByRole("main")).toContainText(
      "Takk!Din rolle i partssamarbeidet er viktig for å skape engasjement og gode arbeidsforhold på arbeidsplassenTakk for din deltakelse,du kan nå lukke denne siden.",
    );
  });

  test("Havner på venteside om tema ikke er åpnet enda", async ({ page }) => {
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/deltaker/tema/${førsteTemaId}/sporsmal/${førsteSpørsmålId}`,
      async (route) => {
        await route.fulfill({ status: 202 });
      },
    );

    await expect(
      page.getByText("Spørsmål blir snart tilgjengelig."),
    ).toBeVisible();
  });

  test("Viser riktig når en går tilbake til lagret svar", async ({ page }) => {
    const tema = helSpørreundersøkelse[0];

    const element = tema.spørsmål[0];
    const svar =
      element.svaralternativer[2 % element.svaralternativer.length].tekst;

    await expect(page.getByText(element.tekst)).toBeVisible();
    await expect(page.getByRole("button", { name: "Svar" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Neste" })).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Tilbake" }),
    ).not.toBeVisible();

    await page.getByText(svar, { exact: true }).click();
    await page.getByRole("button", { name: "Svar" }).click();

    await expect(page.getByText(element.tekst)).not.toBeVisible();
    await expect(page.getByRole("button", { name: "Svar" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Neste" })).not.toBeVisible();
    await expect(page.getByRole("button", { name: "Tilbake" })).toBeVisible();

    await page.getByRole("button", { name: "Tilbake" }).click();

    await expect(page.getByText(element.tekst)).toBeVisible();
    await expect(page.getByRole("button", { name: "Svar" })).not.toBeVisible();
    await expect(page.getByRole("button", { name: "Neste" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Tilbake" }),
    ).not.toBeVisible();
    await expect(page.getByText(svar, { exact: true })).toBeChecked();
  });

  test("Viser checkbox for flervalg og radio for resten", async ({ page }) => {
    const tema = helSpørreundersøkelse[0];

    await expect(page.locator("input[type=checkbox]")).toHaveCount(0);
    await expect(page.locator("input[type=radio]")).toHaveCount(
      tema.spørsmål[0].svaralternativer.length,
    );
    await page
      .getByRole("radio", {
        name: tema.spørsmål[0].svaralternativer[1].tekst,
        exact: true,
      })
      .click();
    await page.getByRole("button", { name: "Svar" }).click();

    await expect(page.locator("input[type=checkbox]")).toHaveCount(0);
    await expect(page.locator("input[type=radio]")).toHaveCount(
      tema.spørsmål[1].svaralternativer.length,
    );
    await page
      .getByRole("radio", { name: tema.spørsmål[1].svaralternativer[1].tekst })
      .click();
    await page.getByRole("button", { name: "Svar" }).click();

    await expect(page.locator("input[type=checkbox]")).toHaveCount(
      tema.spørsmål[2].svaralternativer.length,
    );
    await expect(page.locator("input[type=radio]")).toHaveCount(0);
  });

  baseTest(
    "Redirecter til bli med om man ikke har sesjon",
    async ({ page }) => {
      await page.goto(`http://localhost:2222/${spørreundersøkelseId}/deltaker`);
      await page.getByPlaceholder("Enter any user/subject").click();
      await page.getByPlaceholder("Enter any user/subject").fill("asdf");
      await page.getByPlaceholder("Enter any user/subject").press("Enter");

      await page.waitForLoadState("domcontentloaded");
      await page.goto(
        `http://localhost:2222/${spørreundersøkelseId}/deltaker/tema/${førsteTemaId}/sporsmal/${førsteSpørsmålId}`,
      );
      await page.waitForURL(
        `http://localhost:2222/${spørreundersøkelseId}/deltaker?sesjon=utl%C3%B8pt`,
      );

      expect(page.url()).toBe(
        `http://localhost:2222/${spørreundersøkelseId}/deltaker?sesjon=utl%C3%B8pt`,
      );
    },
  );

  test("Viser feilmelding ved feil i sendSvar", async ({ page }) => {
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/deltaker/tema/${førsteTemaId}/sporsmal/${førsteSpørsmålId}/svar`,
      async (route) => {
        await route.fulfill({ status: 400 });
      },
    );

    await page.getByText("Bra", { exact: true }).first().click();
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

    await page.getByText("Bra", { exact: true }).first().click();
    await page.getByRole("button", { name: "Svar" }).click();
    await expect(
      page.getByText("Noe gikk galt. Prøv å laste siden på nytt."),
    ).toBeVisible();
  });

  test("Viser alert uten valgt svar", async ({ page }) => {
    // Test radio button case (first question)
    const tema = helSpørreundersøkelse[0];
    const element = tema.spørsmål[0];

    await expect(page.getByText(element.tekst)).toBeVisible();
    await expect(page.getByRole("button", { name: "Svar" })).toBeVisible();
    await expect(page.locator("input[type=radio]")).toHaveCount(
      element.svaralternativer.length,
    );

    await page.getByRole("button", { name: "Svar" }).click();

    // Check that the error message is visible for radio buttons
    await expect(page.getByText("Velg minst ett svar")).toBeVisible();

    // Check that it has proper alert role and aria-live for screen readers
    const alertElement = page.getByText("Velg minst ett svar");
    await expect(alertElement).toHaveAttribute("role", "alert");
    await expect(alertElement).toHaveAttribute("aria-live", "assertive");

    // Navigate to checkbox question
    await page
      .getByRole("radio", {
        name: element.svaralternativer[0].tekst,
        exact: true,
      })
      .click();
    await page.getByRole("button", { name: "Svar" }).click();
    await page
      .getByRole("radio", {
        name: tema.spørsmål[1].svaralternativer[0].tekst,
        exact: true,
      })
      .click();
    await page.getByRole("button", { name: "Svar" }).click();

    // Now we should be on the checkbox question (third question in the theme)
    const checkboxQuestion = tema.spørsmål[2];
    await expect(page.getByText(checkboxQuestion.tekst)).toBeVisible();
    await expect(page.locator("input[type=checkbox]")).toHaveCount(
      checkboxQuestion.svaralternativer.length,
    );

    await page.getByRole("button", { name: "Svar" }).click();

    // Check that the error message is visible for checkboxes too
    await expect(page.getByText("Velg minst ett svar")).toBeVisible();

    // Check accessibility attributes for checkbox case as well
    const checkboxAlertElement = page.getByText("Velg minst ett svar");
    await expect(checkboxAlertElement).toHaveAttribute("role", "alert");
    await expect(checkboxAlertElement).toHaveAttribute(
      "aria-live",
      "assertive",
    );
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

    await page.getByText("Bra", { exact: true }).first().click();
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
    await expect(page.getByRole("main")).toMatchAriaSnapshot(`
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

  test("Bruker valgt svaralternativ fra cookieHandler", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: partssamarbeid.navn }),
    ).toBeVisible();

    await page.getByLabel("Svært bra").check();
    await page.getByRole("button", { name: "Svar" }).click();
    await page.getByRole("button", { name: "Tilbake" }).click();
    await expect(page.getByLabel("Svært bra")).toBeChecked();
  });

  test("test av axe", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
