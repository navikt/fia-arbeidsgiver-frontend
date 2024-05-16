import { deltakerTest } from "@/utils/playwrightUtils";
import { expect } from "@playwright/test";

deltakerTest("deltakerTest", async ({ page }) => {
  await expect(page.locator("legend")).toContainText(
    "Hvilke av disse faktorene tror du har størst innflytelse på sykefraværet der du jobber?",
  );
});
