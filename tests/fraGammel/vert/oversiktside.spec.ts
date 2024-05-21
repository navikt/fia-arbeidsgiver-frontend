import { setRouteVariant, vertTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";

test.describe("Vert/oversiktside", () => {
  test("Andre tema er ikke åpnet før første tema er besvart", async ({
    page,
  }) => {
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

  test("Andre tema er åpnet når første tema er besvart", async ({ page }) => {
    setRouteVariant("vert-temaoversikt:success-første-besvart");

    await page.reload();
    await page.getByRole("button", { name: "Lukk" }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("button", { name: "Gjenoppta" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Start" }).nth(0),
    ).not.toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Start" }).nth(1),
    ).not.toBeVisible();
  });

  test("test av axe", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
