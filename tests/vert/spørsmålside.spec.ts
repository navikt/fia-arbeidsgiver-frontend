import { vertTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
// eslint-disable-next-line @typescript-eslint/no-var-requires

test.describe("Vert/spørsmålside", () => {
  test.beforeEach(({ page }) => {
    page.unroute(
      "http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/vert/86701b0e-a786-406a-881b-08af5b9ddb93/tema/4/start",
    );
  });
  test("Laster siden", async ({ page }) => {
    await page.goto(
      "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/vert/86701b0e-a786-406a-881b-08af5b9ddb93/tema/4",
    );
    await expect(page.getByRole("main")).toContainText("Start");
  });

  test("Viser feilmelding ved problem med åpning av tema", async ({ page }) => {
    await page.goto(
      "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/vert/86701b0e-a786-406a-881b-08af5b9ddb93/tema/4",
    );
    await page.route(
      `http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/vert/86701b0e-a786-406a-881b-08af5b9ddb93/4/start`,
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
      `http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/vert/86701b0e-a786-406a-881b-08af5b9ddb93/4`,
      async (route) => {
        await route.fulfill({ status: 303 });
      },
    );
    await page.goto(
      "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/vert/86701b0e-a786-406a-881b-08af5b9ddb93/tema/4",
    );
    await expect(page.getByText("Kunne ikke laste tema 4")).toBeVisible();
  });

  test("test av axe", async ({ page }) => {
    await page.goto(
      "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/vert/86701b0e-a786-406a-881b-08af5b9ddb93/tema/4",
    );
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
