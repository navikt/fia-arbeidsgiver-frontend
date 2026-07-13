import { vertTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
import { Page } from "playwright-core";
// eslint-disable-next-line @typescript-eslint/no-var-requires
// @ts-ignore
import { partssamarbeid, spørreundersøkelseId } from "@/utils/dummydata";

const førsteTemaId = partssamarbeid.id;

test.describe("Vert/spørsmålside", () => {
  test.beforeEach(({ page }) => {
    page.unroute(
      `http://localhost:2222/api/${spørreundersøkelseId}/vert/tema/${førsteTemaId}/start`,
    );
  });
  test("Laster siden", async ({ page }) => {
    await page.goto(
      `http://localhost:2222/${spørreundersøkelseId}/vert/tema/${førsteTemaId}`,
    );
    await expect(page.getByRole("main")).toContainText("Start");
  });

  test("Viser feilmelding ved problem med åpning av tema", async ({ page }) => {
    await page.goto(
      `http://localhost:2222/${spørreundersøkelseId}/vert/tema/${førsteTemaId}`,
    );
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/vert/tema/${førsteTemaId}/start`,
      async (route) => {
        await route.fulfill({ status: 303 });
      },
    );
    await page.getByRole("button", { name: "Start" }).click();
    await expect(page.getByText("Kunne ikke åpne tema")).toBeVisible();
  });

  test("Viser feilmelding ved problem med å hente temaoversikt", async ({
    page,
  }) => {
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/vert/tema/${førsteTemaId}`,
      async (route) => {
        await route.fulfill({ status: 303 });
      },
    );
    await page.goto(
      `http://localhost:2222/${spørreundersøkelseId}/vert/tema/${førsteTemaId}`,
    );
    await expect(
      page.getByText(`Kunne ikke laste tema ${førsteTemaId}`),
    ).toBeVisible();
  });

  test("Screenshot av innhold likner", async ({ page }) => {
    await page.goto(
      `http://localhost:2222/${spørreundersøkelseId}/vert/tema/${førsteTemaId}`,
    );
    await expect(page.getByRole("main")).toContainText("Start");
    await expect(page).toHaveScreenshot({ fullPage: true });
  });

  test("Sjekker at accessibility-tree er i orden", async ({ page }) => {
    await page.goto(
      `http://localhost:2222/${spørreundersøkelseId}/vert/tema/${førsteTemaId}`,
    );
    await expect(page.getByRole("main")).toContainText("Start");
    await expect(page.getByRole("main")).toMatchAriaSnapshot(`
      - main:
        - text: "Demoutgave: Dette er en demoside for å teste ut ny funksjonalitet. Den skal ikke brukes med ekte virksomheter."
        - button "Gå til oversikt"
        - button "Vis QR-kode"
        - heading "Partssamarbeid" [level=1]
        - button "Start"
        - list:
          - listitem: Partssamarbeid er samarbeidet mellom leder, tillitsvalgt og verneombud.
          - listitem: Et velfungerende partssamarbeid verdsetter og utnytter hverandres kompetanse og ansvarsområder
          - listitem: Samarbeidet er viktig for å oppnå godt arbeidsmiljø, lavt sykefravær og sikre høy produktivitet.
    `);
  });

  test("test av axe", async ({ page }) => {
    await page.goto(
      `http://localhost:2222/${spørreundersøkelseId}/vert/tema/${førsteTemaId}`,
    );
    const accessibilityScanResults = await new AxeBuilder({
      page: page as Page,
    }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
