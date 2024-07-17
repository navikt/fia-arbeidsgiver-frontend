import { deltakerTest as test } from "@/utils/playwrightUtils";
import { expect } from "@playwright/test";

test("deltakerTest", async ({ page }) => {
  await expect(page.locator("legend")).toContainText(
    "Vi planlegger og gjennomfører jevnlige møter i partssamarbeidet",
  );
});
