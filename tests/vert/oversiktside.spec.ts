import { TemaStatus } from "@/app/_types/TemaStatus";
import { vertTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
// @ts-ignore
import { helSpørreundersøkelse, spørreundersøkelseId } from "@/utils/dummydata";

test.describe("Vert/oversiktside", () => {
  test.beforeEach(({ page }) => {
    page.unroute(`http://localhost:2222/api/${spørreundersøkelseId}/vert`);
  });
  test("Andre tema er ikke åpnet før første tema er besvart", async ({
    page,
  }) => {
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/vert`,
      async (route) => {
        const json = helSpørreundersøkelse;
        json[0].status = TemaStatus.ÅPNET;
        json[1].status = TemaStatus.IKKE_ÅPNET;
        json[2].status = TemaStatus.IKKE_ÅPNET;
        await route.fulfill({ json });
      },
    );
    await page.reload();
    await expect(page.getByRole("main")).toContainText("Start");
    await expect(
      page.getByRole("button", { name: "Start" }).nth(1),
    ).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Start" }).nth(0),
    ).not.toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Gjenoppta" }),
    ).not.toBeVisible();
  });

  test(
    "Andre tema er åpnet når første tema er besvart",
    async ({ page }) => {
      // TODO: Bedre løsning. Mocker apiet før vi kommer til frackend, for å unngå problemer med parralell kjøring av tester.
      await page.route(
        `http://localhost:2222/api/${spørreundersøkelseId}/vert`,
        async (route) => {
          const json = helSpørreundersøkelse;
          json[0].status = TemaStatus.ALLE_SPØRSMÅL_ÅPNET;
          json[1].status = TemaStatus.ÅPNET;
          json[2].status = TemaStatus.IKKE_ÅPNET;
          await route.fulfill({ json });
        },
      );

      await page.reload();
      await page.getByRole("button", { name: "Lukk" }).click();

      await expect(
        page.getByRole("button", { name: "Start" }).nth(0),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Start" }).nth(0),
      ).not.toBeDisabled();
      await expect(
        page.getByRole("button", { name: "Start" }).nth(1),
      ).toBeDisabled();
    },
  );

  test("Viser feilmelding når det er problemer med å hente temaoversikt", async ({
    page,
  }) => {
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

  test("test av axe", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
