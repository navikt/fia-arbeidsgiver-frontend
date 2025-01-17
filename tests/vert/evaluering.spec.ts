import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
import { test as base } from "@playwright/test";
import { Page } from 'playwright-core';
import kontekstRoutes from "../../mocks/routes/vert/kontekst";

// Må override, da den i playwrighUtils.ts er satt til å hoppe forbi denne siden.
const test = base.extend<object>({
  page: async ({ page }, use) => {
	await page.unroute("http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/vert/kontekst");
	await page.route(
		"http://localhost:2222/api/e2f863df-309e-4314-9c7e-c584237fd90a/vert/kontekst",
		  async (route) => {
			await route.fulfill({status: kontekstRoutes[0].variants[2].options.status, json: kontekstRoutes[0].variants[2].options.body});
		  },
		);
    await page.goto("http://localhost:2222");
    await page.getByPlaceholder("Enter any user/subject").click();
    await page.getByPlaceholder("Enter any user/subject").fill("asdf");
    await page.getByPlaceholder("Enter any user/subject").press("Enter");
    await page.getByRole('button', { name: 'Start evalueringen' }).click();
    await page.getByRole('button', { name: 'Kom i gang' }).click();
    await page.getByRole('button', { name: 'Lukk' }).click();
    await use(page);
  },
});

test.describe("Vert/evaluering", () => {
  test("rett innhold blir tegnet opp", async ({ page }) => {
    await page.getByRole('heading', { name: 'Samarbeidsplan' }).click();
    await page.getByLabel('Samarbeidsplan').getByRole('heading', { name: 'Partssamarbeid', exact: true }).click();
    await page.getByRole('heading', { name: 'Utvikle partssamarbeidet' }).click();
    await page.getByRole('button', { name: 'Utvikle partssamarbeidet 15.' }).click();
    await page.getByText('Mål: Styrke og strukturere').click();
    await page.getByLabel('Samarbeidsplan').getByRole('heading', { name: 'Sykefraværsarbeid' }).click();
    await page.getByRole('heading', { name: 'Oppfølgingssamtaler' }).click();
    await page.getByText('18.11').nth(1).click();
    await page.getByRole('heading', { name: 'Tilretteleggings- og' }).click();
    await page.getByRole('button', { name: 'Oppfølgingssamtaler 15. nov.' }).click();
    await page.getByRole('button', { name: 'Oppfølgingssamtaler 15. nov.' }).click();
    await page.getByRole('button', { name: 'Tilretteleggings- og' }).click();
    await page.getByText('Mål: Utvikle rutiner og').click();
    await page.getByRole('heading', { name: 'Oppfølging av arbeidsmiljø' }).click();
    await page.getByRole('button', { name: 'Oppfølging av arbeidsmiljø' }).click();
    await page.getByText('Mål: Øke ferdigheter og gi st').click();
    await page.getByRole('button', { name: 'Lukk' }).click();
    await page.getByRole('button', { name: 'Vis', exact: true }).click();
    await page.getByRole('menuitem', { name: 'QR-kode' }).click();
    await page.getByRole('button', { name: 'Lukk' }).click();
    await page.getByRole('button', { name: 'Vis', exact: true }).click();
    await page.getByRole('menuitem', { name: 'Samarbeidsplan' }).click();
  });
  
  test("Screenshot av innhold likner", async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true });
  });

  test("test av axe", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page: (page as Page) }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
