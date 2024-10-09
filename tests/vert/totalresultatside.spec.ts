import { vertTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { Page, expect } from "@playwright/test";

// @ts-ignore
import { partssamarbeid, spørreundersøkelseId } from "@/utils/dummydata";
const temaId = partssamarbeid.id;

async function gåTilResultater(page: Page) {
  await page.getByRole("button", { name: "Vis alle resultater" }).click();
  await page.getByRole("button", { name: "Fullfør", exact: true }).click();
  await expect(page.locator("body")).toContainText("flere valg er mulig");
}

test.describe("Vert/resultatside", () => {
  test.beforeEach(({ page }) => {
    page.unroute(`http://localhost:2222/api/${spørreundersøkelseId}/vert`);
    page.unroute(
      `http://localhost:2222/api/${spørreundersøkelseId}/vert/tema/${temaId}/resultater`,
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
      `http://localhost:2222/api/${spørreundersøkelseId}/vert/oversikt`,
      async (route) => {
        await route.fulfill({ status: 303 });
      },
    );

    await page.reload();
    await expect(
      page.getByText("Kunne ikke laste oversikt over temaer"),
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

    await page.reload();
    // TODO: Fjern denne når vi får fikset at beckend sender error første gang
    await expect(
      page.getByText("Kunne ikke laste resultater for tema"),
    ).toBeVisible({ timeout: 60000 });
  });

  test("test av axe", async ({ page }) => {
    await gåTilResultater(page);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
