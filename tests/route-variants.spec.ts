import { clearRouteVariants, setRouteVariant } from "@/utils/playwrightUtils";
import { test, expect } from "@playwright/test";

test.describe("Route variant", () => {
  test.beforeEach(async () => {
    // Clear route variants
    clearRouteVariants();
  });
  test("Endring av route variant", async ({ page }) => {
    await page.goto("http://localhost:2222");
    await page.getByPlaceholder("Enter any user/subject").click();
    await page.getByPlaceholder("Enter any user/subject").fill("asdf");
    await page.getByPlaceholder("Enter any user/subject").press("Enter");

    await page.getByRole("button", { name: "Kom i gang" }).click();
    await page.getByRole("button", { name: "Lukk" }).click();
    await expect(page.getByRole("main")).toContainText(
      "Utvikle partssamarbeidet i virksomheten",
    );
    await expect(
      page.getByRole("button", { name: "Gjenoppta" }),
    ).not.toBeVisible();
    setRouteVariant("vert-temaoversikt:success-første-besvart");

    await page.reload();
    await page.getByRole("button", { name: "Lukk" }).click();

    await expect(page.getByRole("button", { name: "Gjenoppta" })).toBeVisible();
  });

  test.afterAll(async () => {
    clearRouteVariants();
  });
});
