import { test as base } from "@playwright/test";

export const vertTest = base.extend({
  page: async ({ page }, use) => {
    await page.goto("http://localhost:2222");
    await page.getByPlaceholder("Enter any user/subject").click();
    await page.getByPlaceholder("Enter any user/subject").fill("asdf");
    await page.getByPlaceholder("Enter any user/subject").press("Enter");

    await page.goto("http://localhost:2222");

    await page.getByRole("button", { name: "Start behovsvurdering" }).click();
    await page.getByRole("button", { name: "Kom i gang" }).click();
    await page.getByRole("button", { name: "Lukk" }).click();
    await use(page);
  },
});

export const deltakerTest = base.extend({
  page: async ({ page }, use) => {
    await page.goto(
      "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker",
    );
    await page.getByPlaceholder("Enter any user/subject").click();
    await page.getByPlaceholder("Enter any user/subject").fill("asdf");
    await page.getByPlaceholder("Enter any user/subject").press("Enter");

    await page.waitForLoadState("domcontentloaded");
    await page.goto(
      "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker",
    );
    await page.waitForLoadState("domcontentloaded");
    await page.getByRole("button", { name: "Bli med!" }).click();
    await page.waitForLoadState("domcontentloaded");
    await use(page);
  },
});
