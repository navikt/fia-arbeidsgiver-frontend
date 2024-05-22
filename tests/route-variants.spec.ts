import { TemaStatus } from "@/app/_types/TemaoversiktDTO";
import { clearRouteVariants, vertTest as test } from "@/utils/playwrightUtils";
import { expect } from "@playwright/test";
const { dummyTemaoversikt } = require("@/utils/dummyData/vert");

test.describe("Route variant", () => {
  test("Endring av route variant", async ({ page }) => {
    await expect(page.getByRole("main")).toContainText(
      "Utvikle partssamarbeidet i virksomheten",
    );
    await expect(
      page.getByRole("button", { name: "Gjenoppta" }),
    ).not.toBeVisible();
    // TODO: Bedre løsning. Mocker apiet før vi kommer til frackend, for å unngå problemer med parralell kjøring av tester.
    await page.route(
      "http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/vert/86701b0e-a786-406a-881b-08af5b9ddb93",
      async (route) => {
        const json = dummyTemaoversikt;
        json[0].status = TemaStatus.ALLE_SPØRSMÅL_ÅPNET;
        json[1].status = TemaStatus.ÅPNET;
        await route.fulfill({ json });
      },
    );

    await page.reload();
    await page.getByRole("button", { name: "Lukk" }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("button", { name: "Gjenoppta" })).toBeVisible();
  });

  test.afterAll(async () => {
    clearRouteVariants();
  });
});
