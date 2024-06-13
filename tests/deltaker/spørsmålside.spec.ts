import { deltakerTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";

test.describe("Deltaker/spørsmålside", () => {
  test.beforeEach(({ page }) => {
    page.unroute(
      "http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker",
    );
    page.unroute(
      `http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker/1/b16c4b1c-b45e-470d-a1a5-d6f87424d410/svar`,
    );
    page.unroute(
      `http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker/1/b16c4b1c-b45e-470d-a1a5-d6f87424d410`,
    );
  });

  test("rett innhold blir tegnet opp", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Partssamarbeid" }),
    ).toBeVisible();
    await expect(page.getByText("Hvilke av disse faktorene")).toBeVisible();
    await expect(
      page.getByText(
        "ArbeidsbelastningArbeidstidArbeidsforholdLedelseNoe annet",
      ),
    ).toBeVisible();
    await expect(page.getByRole("group")).toContainText(
      "ArbeidsbelastningArbeidstidArbeidsforholdLedelseNoe annet",
    );
    await expect(page.getByRole("button")).toContainText("Svar");
  });

  test("advarsel dersom vi ikke velger svaralternativ (enkeltsvar og flervalg)", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Svar" }).click();
    await expect(page.getByText("Velg minst ett svar")).toBeVisible();
    await page.getByText("Arbeidsforhold").click();
    await page.getByRole("button", { name: "Svar" }).click();

    await expect(page.getByText("Velg det tiltaket som du")).toBeVisible();

    await page.getByLabel("Kompetanseutvikling").check();
    await page.getByLabel("Kompetanseutvikling").uncheck();
    await page.getByRole("button", { name: "Svar" }).click();
    await expect(page.getByText("Velg minst ett svar")).toBeVisible();

    await page.getByLabel("Kompetanseutvikling").check();
    await page.getByLabel("Tilrettelegging av").check();
    await page.getByRole("button", { name: "Svar" }).click();

    await expect(page.getByText("Litt enig")).toBeVisible();
    await page.getByText("Litt enig").click();
    await page.getByRole("button", { name: "Svar" }).click();
    await page.getByText("I liten grad").click();
    await page.getByRole("button", { name: "Svar" }).click();
    await expect(page.getByRole("main")).toContainText(
      "Fullført!Takk for din deltakelse 🎉Du kan nå lukke denne siden.",
    );
  });

  test("havner på ferdigside til slutt", async ({ page }) => {
    await page.getByRole("button", { name: "Svar" }).click();
    await page.getByText("Arbeidsforhold").click();
    await page.getByRole("button", { name: "Svar" }).click();

    await page.getByLabel("Kompetanseutvikling").check();
    await page.getByRole("button", { name: "Svar" }).click();

    await page.getByText("Litt enig").click();
    await page.getByRole("button", { name: "Svar" }).click();
    await page.getByText("I liten grad").click();
    await page.getByRole("button", { name: "Svar" }).click();
    await expect(page.getByRole("main")).toContainText(
      "Fullført!Takk for din deltakelse 🎉Du kan nå lukke denne siden.",
    );
  });

  test("Viser feilmelding ved feil i sendSvar", async ({ page }) => {
    await page.route(
      `http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker/1/b16c4b1c-b45e-470d-a1a5-d6f87424d410/svar`,
      async (route) => {
        await route.fulfill({ status: 400 });
      },
    );

    await page.getByText("Arbeidsforhold").click();
    await page.getByRole("button", { name: "Svar" }).click();
    await expect(
      page.getByText("Kunne ikke sende svar, prøv igjen"),
    ).toBeVisible();

    await page.route(
      `http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker/1/b16c4b1c-b45e-470d-a1a5-d6f87424d410/svar`,
      async (route) => {
        await route.fulfill({ status: 302 });
      },
    );

    await page.getByText("Arbeidsforhold").click();
    await page.getByRole("button", { name: "Svar" }).click();
    await expect(
      page.getByText("Noe gikk galt. Prøv å laste siden på nytt."),
    ).toBeVisible();
  });

  test("Viser feilmelding ved lukket spørsmål og feil i fetchIdentifiserbartSpørsmål", async ({
    page,
  }) => {
    await page.route(
      `http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker/1/b16c4b1c-b45e-470d-a1a5-d6f87424d410/svar`,
      async (route) => {
        await route.fulfill({ status: 303 });
      },
    );

    await page.getByText("Arbeidsforhold").click();
    await page.route(
      "http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker",
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
      `http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker/1/b16c4b1c-b45e-470d-a1a5-d6f87424d410`,
      async (route) => {
        await route.fulfill({ status: 302 });
      },
    );

    await expect(
      page.getByText("Noe gikk galt. Prøv å laste siden på nytt."),
    ).toBeVisible();
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
