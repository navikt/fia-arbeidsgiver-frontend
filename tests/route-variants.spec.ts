import {
  clearRouteVariants,
  setRouteVariant,
  vertTest,
} from "@/utils/playwrightUtils";
import { expect } from "@playwright/test";

vertTest.describe("Route variant", () => {
  vertTest("Endring av route variant", async ({ page }) => {
    await expect(page.getByRole("main")).toContainText(
      "Utvikle partssamarbeidet i virksomheten",
    );
    await expect(
      page.getByRole("button", { name: "Gjenoppta" }),
    ).not.toBeVisible();
    setRouteVariant("vert-temaoversikt:success-første-besvart");

    await page.reload();
    await page.getByRole("button", { name: "Lukk" }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("button", { name: "Gjenoppta" })).toBeVisible();
  });

  vertTest.afterAll(async () => {
    clearRouteVariants();
  });
});
