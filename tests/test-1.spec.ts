import { test, expect } from "@playwright/test";

test("første test for å sjekke at noe funker", async ({ page }) => {
  await page.goto(
    "http://host.docker.internal:6969/azure/authorize?client_id=fia-arbeidsgiver-frontend&code_challenge=tE1Q7IAA3d5J3gFUkhZc_7tLsjFKBlsGgBEaGgurJ1M&code_challenge_method=S256&nonce=q5k6mB8_wh5WARC0Yo8511f0Wo_thFyTHQSuKkhS_WA&redirect_uri=http%3A%2F%2Flocalhost%3A2222%2Foauth2%2Fcallback&response_mode=query&response_type=code&scope=openid&state=lSIfX9Q4gNwBAUWCuNsAccLPC9Emg-TSlFQDHh1IPLM",
  );
  await page.getByPlaceholder("Enter any user/subject").click();
  await page.getByPlaceholder("Enter any user/subject").fill("asdf");
  await page.getByPlaceholder("Enter any user/subject").press("Enter");
  await page.getByRole("button", { name: "Kom i gang" }).click();
  await page.getByRole("button", { name: "Kopier lenke" }).click();
  await page.getByRole("button", { name: "Lukk" }).click();

  await expect(
    page.getByRole("heading", { name: "Utvikle partssamarbeidet i" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Start" }).first().click();
  await page.getByRole("button", { name: "Start" }).click();
  await expect(page.getByRole("list")).toContainText(
    "NAV er opptatt av det utvidede partssamarbeidet. Det betyr samarbeid mellom ledere, tillitsvalgte og verneombud for å utvikle og forbedre arbeidsplassen.",
  );
  await page.getByRole("button", { name: "Resultater Vis resultater" }).click();
  await page.getByLabel("Vis resultater").click();
  await page.getByRole("button", { name: "Gå til resultat" }).click();
  await expect(page.getByRole("heading")).toContainText(
    "Utvikle partssamarbeidet i virksomheten",
  );
  await expect(page.getByRole("main")).toContainText(
    "Hvor lenge har du vært en del av gruppen?",
  );
  await page.getByRole("button", { name: "Gå til oversikt" }).click();
  await expect(page.getByRole("main")).toContainText(
    "Deltakere som har svart19/20Utvikle partssamarbeidet i virksomhetenStart",
  );
});
