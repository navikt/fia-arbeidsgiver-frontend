import AxeBuilder from "@axe-core/playwright";
import { expect, test as base, Page } from "@playwright/test";

const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto(
      "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker",
    );
    await page.getByPlaceholder("Enter any user/subject").click();
    await page.getByPlaceholder("Enter any user/subject").fill("asdf");
    await page.getByPlaceholder("Enter any user/subject").press("Enter");
    await use(page);
  },
});

test.describe("Deltaker/bli med", () => {
  test.beforeEach(({ page }) => {
    page.unroute("http://localhost:2222/api/bli-med");
    page.unroute(
      "http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker",
    );
  });

  test("rett innhold blir tegnet opp", async ({ page }) => {
    await expect(page.getByRole("heading")).toContainText("Velkommen!");
    await expect(page.getByRole("main")).toContainText(
      "Trykk på knappen for å bli med",
    );
    await expect(page.getByRole("button", { name: "Bli med!" })).toBeVisible();
  });

  test("viser ikke sesjon utløpt varsel uten manglende sesjon", async ({
    page,
  }) => {
    await expect(
      page.getByText("FeilSesjonen din har utløpt."),
    ).not.toBeVisible();
  });

  test("viser sesjon utløpt varsel", async ({ page }) => {
    await page.goto(
      "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker?sesjon=utl%C3%B8pt",
    );
    await expect(page.getByText("FeilSesjonen din har utløpt.")).toBeVisible();
  });

  test("Får opp feilmelding for feil bli-med status", async ({
    page,
  }: {
    page: Page;
  }) => {
    await testForNetworkError(
      page,
      "http://localhost:2222/api/bli-med",
      { status: 403 },
      "Vi får ikke koblet til spørreundersøkelsen. Er du sikker på at du skrev inn riktig lenke?",
    );
  });

  test("Får opp feilmelding for bli-med ikke ok", async ({
    page,
  }: {
    page: Page;
  }) => {
    await testForNetworkError(
      page,
      "http://localhost:2222/api/bli-med",
      { status: 303 },
      "Noe gikk galt. Er du sikker på at du skrev inn riktig lenke?",
    );
  });

  test("Får opp feilmelding for bli-med feil spørreundersøkelseId", async ({
    page,
  }) => {
    await testForNetworkError(
      page,
      "http://localhost:2222/api/bli-med",
      { status: 200, body: JSON.stringify({ spørreundersøkelseId: "feil" }) },
      "Feil spørreundersøkelseId",
    );
  });

  test("Får opp feilmelding for feil i spørsmålshenting", async ({ page }) => {
    await testForNetworkError(
      page,
      "http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker",
      { status: 303 },
      "Noe gikk galt med henting av neste spørsmål.",
    );
  });

  test("test av axe", async ({ page }) => {
    let accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    await page.goto(
      "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker?sesjon=utl%C3%B8pt",
    );
    accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

async function testForNetworkError(
  page: Page,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any,
  expectedErrorMessage: string,
  waitForSelector: string = ".navds-alert",
  side: string = "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker",
) {
  await page.route(url, async (route) => {
    await route.fulfill(options);
  });

  await page.goto(side);

  await page.getByRole("button", { name: "Bli med!" }).click();

  if (waitForSelector) {
    await page.waitForSelector(waitForSelector);
  }

  expect(await page.locator(waitForSelector)).toContainText(
    expectedErrorMessage,
  );
}
