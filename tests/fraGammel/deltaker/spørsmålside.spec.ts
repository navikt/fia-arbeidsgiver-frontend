import { deltakerTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";

test.describe("Deltaker/spørsmålside", () => {
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

  test.fixme("Bruker valgt svaralternativ fra cookieHandler", () => {
    // TODO: Finn ut av testing av cookieHandler
  });

  test.fixme("test av axe", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    //TODO: Får feil på svg her.
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
