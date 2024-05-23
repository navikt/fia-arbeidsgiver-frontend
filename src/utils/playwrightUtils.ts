import { test as base } from "@playwright/test";

export function clearRouteVariants() {
  return fetch("http://localhost:3110/api/mock/custom-route-variants", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function setRouteVariant(
  routeVariant: string | string[],
): Promise<Response> | Promise<Response>[] {
  if (Array.isArray(routeVariant)) {
    return routeVariant
      .map((variant) => {
        return setRouteVariant(variant);
      })
      .flat();
  }
  return fetch("http://localhost:3110/api/mock/custom-route-variants", {
    body: JSON.stringify({
      id: routeVariant,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const vertTest = base.extend({
  page: async ({ page }, use) => {
    await clearRouteVariants();
    await page.goto("http://localhost:2222");
    await page.getByPlaceholder("Enter any user/subject").click();
    await page.getByPlaceholder("Enter any user/subject").fill("asdf");
    await page.getByPlaceholder("Enter any user/subject").press("Enter");

    await page.getByRole("button", { name: "Kom i gang" }).click();
    await page.getByRole("button", { name: "Lukk" }).click();
    await use(page);
  },
});

export const deltakerTest = base.extend({
  page: async ({ page }, use) => {
    await clearRouteVariants();
    await page.goto(
      "http://localhost:2222/e2f863df-309e-4314-9c7e-c584237fd90a/deltaker",
    );
    await page.getByPlaceholder("Enter any user/subject").click();
    await page.getByPlaceholder("Enter any user/subject").fill("asdf");
    await page.getByPlaceholder("Enter any user/subject").press("Enter");

    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Bli med!" }).click();
    await page.waitForLoadState("networkidle");
    await use(page);
  },
});
