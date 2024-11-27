import { deltakerTest as test } from "@/utils/playwrightUtils";
import { expect } from "@playwright/test";

test("deltakerTest", async ({ page }) => {
  await expect(page.locator("legend")).toContainText(
    "Hvordan opplever du at partssamarbeidet har utviklet seg i løpet av samarbeidsperioden?",
  );
});
