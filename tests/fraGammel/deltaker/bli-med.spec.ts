import AxeBuilder from "@axe-core/playwright";
import { expect, test as base } from "@playwright/test";

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

  test.fixme("test av axe", async ({ page }) => {
    let accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    //TODO: Får feil på svg her.
    expect(accessibilityScanResults.violations).toEqual([]);

    await page.goto(
      "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker?sesjon=utl%C3%B8pt",
    );
    accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
