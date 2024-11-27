import { vertTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
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
    await expect(page.getByText(`Kunne ikke laste tema ${førsteTemaId}`)).toBeVisible();
  });

  test("test av axe", async ({ page }) => {
    await page.goto(
      `http://localhost:2222/${spørreundersøkelseId}/vert/tema/${førsteTemaId}`,
    );
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
