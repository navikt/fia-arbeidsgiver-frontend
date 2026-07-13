import { vertTest as test } from "@/utils/playwrightUtils";
import AxeBuilder from "@axe-core/playwright";
import { Page, expect } from "@playwright/test";
import { Page as CorePage } from "playwright-core";

// @ts-ignore
import { partssamarbeid, spørreundersøkelseId } from "@/utils/dummydata";
const temaId = partssamarbeid.id;

async function gåTilResultater(page: Page) {
  await page.getByRole("button", { name: "Vis alle resultatene" }).click();
  await page.getByRole("button", { name: "Fullfør", exact: true }).click();
  await expect(page.locator("body")).toContainText("Hvordan opplever du");
}

test.describe("Vert/resultatside", () => {
  test.beforeEach(({ page }) => {
    page.unroute(`http://localhost:2222/api/${spørreundersøkelseId}/vert`);
    page.unroute(
      `http://localhost:2222/api/${spørreundersøkelseId}/vert/tema/${temaId}/resultater`,
    );
  });
  test("Screenshot av innhold likner", async ({ page }) => {
    await gåTilResultater(page);
    await expect(page).toHaveScreenshot({ fullPage: true });
  });

  test("Viser feilmelding når det er problemer med å hente temaoversikt", async ({
    page,
  }) => {
    await gåTilResultater(page);
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/vert/oversikt`,
      async (route) => {
        await route.fulfill({ status: 303 });
      },
    );

    await page.reload();
    await expect(
      page.getByText("Kunne ikke laste oversikt over temaer"),
    ).toBeVisible();
  });

  test("Viser feilmelding når det er problemer med å hente temaresultat", async ({
    page,
  }) => {
    // TODO: Fjern denne når vi får fikset at beckend sender error første gang
    test.setTimeout(90000);
    await gåTilResultater(page);
    await page.route(
      `http://localhost:2222/api/${spørreundersøkelseId}/vert/tema/${temaId}/resultater`,
      async (route) => {
        await route.fulfill({ status: 303 });
      },
    );

    await page.reload();
    // TODO: Fjern denne når vi får fikset at beckend sender error første gang
    await expect(
      page.getByText("Kunne ikke laste resultater for tema"),
    ).toBeVisible({ timeout: 60000 });
  });

  test("Sjekker at accessibility-tree er i orden", async ({ page }) => {
    await gåTilResultater(page);
    await expect(page.getByRole("main")).toMatchAriaSnapshot(`
      - main:
        - text: "Demoutgave: Dette er en demoside for å teste ut ny funksjonalitet. Den skal ikke brukes med ekte virksomheter."
        - button "Gå til oversikt"
        - button "Vis QR-kode"
        - heading "Partssamarbeid" [level=1]
        - radiogroup "Hvis du bruker skjermleser, bør du velge tabell":
          - radio "Graf" [checked]
          - radio "Tabell"
        - paragraph: Utvikle partssamarbeidet
        - img "Hvordan opplever du at partssamarbeidet harutviklet seg i løpet av samarbeidsperioden?": Antall svar Hvordan opplever du at partssamarbeidet harutviklet seg i løpet av samarbeidsperioden? Svært bra Bra Dårlig Svært dårlig Vet ikke 0 1 2
        - paragraph: Utvikle partssamarbeidet
        - img "Som leder, tillitsvalgt eller verneombud har jegfått en bedre forståelse av min rolle og mineansvarsområder i partssamarbeidet": Antall svar Som leder, tillitsvalgt eller verneombud har jegfått en bedre forståelse av min rolle og mineansvarsområder i partssamarbeidet Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Utvikle partssamarbeidet
        - img "Vi har opparbeidet oss nødvendig kompetanse for å forebygge og håndtere sykefraværet vårt": Antall svar Vi har opparbeidet oss nødvendig kompetanse for å forebygge og håndtere sykefraværet vårt (flere valg er mulig) 0 1 2 Enig Litt enig Litt uenig Uenig Vet ikke
        - paragraph: Veien videre
        - img "Vi har laget konkrete planer for hvordan vi ipartssamarbeidet skal jobbe fremover": Antall svar Vi har laget konkrete planer for hvordan vi ipartssamarbeidet skal jobbe fremover Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Veien videre
        - img "Jeg opplever at vi er motiverte for å samarbeidevidere om sykefravær og arbeidsmiljø": Antall svar Jeg opplever at vi er motiverte for å samarbeidevidere om sykefravær og arbeidsmiljø Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - heading "Sykefraværsarbeid" [level=1]
        - paragraph: Sykefraværsrutiner
        - img "Vi jobber nå mer systematisk for å forebyggesykefraværet vårt": Antall svar Vi jobber nå mer systematisk for å forebyggesykefraværet vårt Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Sykefraværsrutiner
        - img "Vi har godt etablerte og lett tilgjengeligesykefraværsrutiner": Antall svar Vi har godt etablerte og lett tilgjengeligesykefraværsrutiner Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Sykefraværsrutiner
        - img "Ansatte kjenner til egne plikter og rettigheternår de er sykmeldt eller står i fare for å bli det": Antall svar Ansatte kjenner til egne plikter og rettigheternår de er sykmeldt eller står i fare for å bli det Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Oppfølgingssamtaler
        - img "Jeg opplever at ledere er trygge underoppfølgingsamtaler med ansatte som ersykmeldt eller står i fare for å bli det": Antall svar Jeg opplever at ledere er trygge underoppfølgingsamtaler med ansatte som ersykmeldt eller står i fare for å bli det Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Tilretteleggings- og medvirkningsplikt
        - img "Vi har utarbeidet og tilgjengeliggjort en oversiktover våre tilretteleggingsmuligheter": Antall svar Vi har utarbeidet og tilgjengeliggjort en oversiktover våre tilretteleggingsmuligheter Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Tilretteleggings- og medvirkningsplikt
        - img "Vi har etablerte rutiner og god kultur fortilrettelegging for ansatte": Antall svar Vi har etablerte rutiner og god kultur fortilrettelegging for ansatte Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Tilretteleggings- og medvirkningsplikt
        - img "Ansatte medvirker under tilrettelegging avarbeidsoppgaver": Antall svar Ansatte medvirker under tilrettelegging avarbeidsoppgaver Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Sykefravær - enkeltsaker
        - img "Vi har nødvendig kompetanse for å håndterevanskelige sykefraværssaker": Antall svar Vi har nødvendig kompetanse for å håndterevanskelige sykefraværssaker Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Veien videre
        - img "Vi vet hvor vi finner gode verktøy i arbeidet medå redusere sykefraværet vårt": Antall svar Vi vet hvor vi finner gode verktøy i arbeidet medå redusere sykefraværet vårt Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Veien videre
        - img "Jeg tror videre forebyggendesykefraværsarbeid vil bidra til å reduseresykefraværet hos oss": Antall svar Jeg tror videre forebyggendesykefraværsarbeid vil bidra til å reduseresykefraværet hos oss Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - heading "Arbeidsmiljø" [level=1]
        - paragraph: Utvikle arbeidsmiljøet
        - img "Vi har nå nødvendig kompetanse til å gjøre tiltakog forbedre arbeidsmiljøet vårt": Antall svar Vi har nå nødvendig kompetanse til å gjøre tiltakog forbedre arbeidsmiljøet vårt Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Utvikle arbeidsmiljøet
        - img "Vi har utarbeidet konkrete planer for hvordan viskal jobbe systematisk med arbeidsmiljøet": Antall svar Vi har utarbeidet konkrete planer for hvordan viskal jobbe systematisk med arbeidsmiljøet Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Utvikle arbeidsmiljøet
        - img "Vi har fått god forståelse for hvilke faktorer sompåvirker arbeidsmiljøet vårt": Antall svar Vi har fått god forståelse for hvilke faktorer sompåvirker arbeidsmiljøet vårt Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Endring og omstilling
        - img "Vi har etablert rutiner for medvirkning ogforebygging under endrings- ogomstillingsprosesser": Antall svar Vi har etablert rutiner for medvirkning ogforebygging under endrings- ogomstillingsprosesser Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Endring og omstilling
        - img "Vi har nødvendig kompetanse for å forebyggesykefravær under omstillingsprosesser": Antall svar Vi har nødvendig kompetanse for å forebyggesykefravær under omstillingsprosesser Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Oppfølging av arbeidsmiljøundersøkelser
        - img "Vi har fått tilstrekkelig støtte til å gjennomføretiltak basert på egen arbeidsmiljøundersøkelse": Antall svar Vi har fått tilstrekkelig støtte til å gjennomføretiltak basert på egen arbeidsmiljøundersøkelse Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Oppfølging av arbeidsmiljøundersøkelser
        - img "Vi har opparbeidet oss nødvendig kompetansetil å følge opp fremtidigearbeidsmiljøundersøkelser": Antall svar Vi har opparbeidet oss nødvendig kompetansetil å følge opp fremtidigearbeidsmiljøundersøkelser Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Livsfaseorientert personalpolitikk
        - img "Vi har en personalpolitikk som ivaretar ansattesbehov i ulike deler av livet (f.eks. graviditet,førpensjon)": Antall svar Vi har en personalpolitikk som ivaretar ansattesbehov i ulike deler av livet (f.eks. graviditet,førpensjon) Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Livsfaseorientert personalpolitikk
        - img "Vi har utarbeidet gode rutiner for hvordan vitilrettelegger ansattes arbeid i ulike deler avlivet": Antall svar Vi har utarbeidet gode rutiner for hvordan vitilrettelegger ansattes arbeid i ulike deler avlivet Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Psykisk helse
        - img "Vi får tilbakemeldinger om at ansatte medpsykiske plager blir godt ivaretatt": Antall svar Vi får tilbakemeldinger om at ansatte medpsykiske plager blir godt ivaretatt Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Psykisk helse
        - img "Som leder, tillitsvalgt eller verneombud har jegopparbeidet meg ferdigheter til å møte og støtteansatte med psykiske plager": Antall svar Som leder, tillitsvalgt eller verneombud har jegopparbeidet meg ferdigheter til å møte og støtteansatte med psykiske plager Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Psykisk helse
        - img "Vi jobber kontinuerlig for å redusere stigmarundt psykiske plager": Antall svar Vi jobber kontinuerlig for å redusere stigmarundt psykiske plager Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: HelseIArbeid
        - img "Vi har fått økt kompetanse om tilrettelegging foransatte med muskel-, skjelett- og psykiskeplager": Antall svar Vi har fått økt kompetanse om tilrettelegging foransatte med muskel-, skjelett- og psykiskeplager Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: HelseIArbeid
        - img "Ansatte ønsker i større grad å jobbe til tross formuskel-, skjelett- og psykiske plager": Antall svar Ansatte ønsker i større grad å jobbe til tross formuskel-, skjelett- og psykiske plager Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Veien videre
        - img "Vi har opparbeidet oss et godt grunnlag for åjobbe videre med arbeidsmiljøet vårt": Antall svar Vi har opparbeidet oss et godt grunnlag for åjobbe videre med arbeidsmiljøet vårt Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
        - paragraph: Veien videre
        - img "Vi har utarbeidet konkrete planer for hvordan viskal videreutvikle arbeidsmiljøet vårt": Antall svar Vi har utarbeidet konkrete planer for hvordan viskal videreutvikle arbeidsmiljøet vårt Enig Litt enig Litt uenig Uenig Vet ikke 0 1 2
    `);
  });

  test("test av axe", async ({ page }) => {
    await gåTilResultater(page);
    const accessibilityScanResults = await new AxeBuilder({
      page: page as CorePage,
    }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
