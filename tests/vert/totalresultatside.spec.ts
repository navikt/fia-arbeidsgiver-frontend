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
        - img "Hvordan opplever du at partssamarbeidet harutviklet seg i løpet av samarbeidsperioden?": Antall svarHvordan opplever du at partssamarbeidet harutviklet seg i løpet av samarbeidsperioden?Svært braBraDårligSvært dårligVet ikke012
        - paragraph: Utvikle partssamarbeidet
        - img "Som leder, tillitsvalgt eller verneombud har jegfått en bedre forståelse av min rolle og mineansvarsområder i partssamarbeidet": Antall svarSom leder, tillitsvalgt eller verneombud har jegfått en bedre forståelse av min rolle og mineansvarsområder i partssamarbeidetEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Utvikle partssamarbeidet
        - img "Vi har opparbeidet oss nødvendig kompetanse for å forebygge og håndtere sykefraværet vårt": Antall svarVi har opparbeidet oss nødvendig kompetanse for å forebygge og håndtere sykefraværet vårt(flere valg er mulig)012EnigLitt enigLitt uenigUenigVet ikke
        - paragraph: Veien videre
        - img "Vi har laget konkrete planer for hvordan vi ipartssamarbeidet skal jobbe fremover": Antall svarVi har laget konkrete planer for hvordan vi ipartssamarbeidet skal jobbe fremoverEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Veien videre
        - img "Jeg opplever at vi er motiverte for å samarbeidevidere om sykefravær og arbeidsmiljø": Antall svarJeg opplever at vi er motiverte for å samarbeidevidere om sykefravær og arbeidsmiljøEnigLitt enigLitt uenigUenigVet ikke012
        - heading "Sykefraværsarbeid" [level=1]
        - paragraph: Sykefraværsrutiner
        - img "Vi jobber nå mer systematisk for å forebyggesykefraværet vårt": Antall svarVi jobber nå mer systematisk for å forebyggesykefraværet vårtEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Sykefraværsrutiner
        - img "Vi har godt etablerte og lett tilgjengeligesykefraværsrutiner": Antall svarVi har godt etablerte og lett tilgjengeligesykefraværsrutinerEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Sykefraværsrutiner
        - img "Ansatte kjenner til egne plikter og rettigheternår de er sykmeldt eller står i fare for å bli det": Antall svarAnsatte kjenner til egne plikter og rettigheternår de er sykmeldt eller står i fare for å bli detEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Oppfølgingssamtaler
        - img "Jeg opplever at ledere er trygge underoppfølgingsamtaler med ansatte som ersykmeldt eller står i fare for å bli det": Antall svarJeg opplever at ledere er trygge underoppfølgingsamtaler med ansatte som ersykmeldt eller står i fare for å bli detEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Tilretteleggings- og medvirkningsplikt
        - img "Vi har utarbeidet og tilgjengeliggjort en oversiktover våre tilretteleggingsmuligheter": Antall svarVi har utarbeidet og tilgjengeliggjort en oversiktover våre tilretteleggingsmuligheterEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Tilretteleggings- og medvirkningsplikt
        - img "Vi har etablerte rutiner og god kultur fortilrettelegging for ansatte": Antall svarVi har etablerte rutiner og god kultur fortilrettelegging for ansatteEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Tilretteleggings- og medvirkningsplikt
        - img "Ansatte medvirker under tilrettelegging avarbeidsoppgaver": Antall svarAnsatte medvirker under tilrettelegging avarbeidsoppgaverEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Sykefravær - enkeltsaker
        - img "Vi har nødvendig kompetanse for å håndterevanskelige sykefraværssaker": Antall svarVi har nødvendig kompetanse for å håndterevanskelige sykefraværssakerEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Veien videre
        - img "Vi vet hvor vi finner gode verktøy i arbeidet medå redusere sykefraværet vårt": Antall svarVi vet hvor vi finner gode verktøy i arbeidet medå redusere sykefraværet vårtEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Veien videre
        - img "Jeg tror videre forebyggendesykefraværsarbeid vil bidra til å reduseresykefraværet hos oss": Antall svarJeg tror videre forebyggendesykefraværsarbeid vil bidra til å reduseresykefraværet hos ossEnigLitt enigLitt uenigUenigVet ikke012
        - heading "Arbeidsmiljø" [level=1]
        - paragraph: Utvikle arbeidsmiljøet
        - img "Vi har nå nødvendig kompetanse til å gjøre tiltakog forbedre arbeidsmiljøet vårt": Antall svarVi har nå nødvendig kompetanse til å gjøre tiltakog forbedre arbeidsmiljøet vårtEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Utvikle arbeidsmiljøet
        - img "Vi har utarbeidet konkrete planer for hvordan viskal jobbe systematisk med arbeidsmiljøet": Antall svarVi har utarbeidet konkrete planer for hvordan viskal jobbe systematisk med arbeidsmiljøetEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Utvikle arbeidsmiljøet
        - img "Vi har fått god forståelse for hvilke faktorer sompåvirker arbeidsmiljøet vårt": Antall svarVi har fått god forståelse for hvilke faktorer sompåvirker arbeidsmiljøet vårtEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Endring og omstilling
        - img "Vi har etablert rutiner for medvirkning ogforebygging under endrings- ogomstillingsprosesser": Antall svarVi har etablert rutiner for medvirkning ogforebygging under endrings- ogomstillingsprosesserEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Endring og omstilling
        - img "Vi har nødvendig kompetanse for å forebyggesykefravær under omstillingsprosesser": Antall svarVi har nødvendig kompetanse for å forebyggesykefravær under omstillingsprosesserEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Oppfølging av arbeidsmiljøundersøkelser
        - img "Vi har fått tilstrekkelig støtte til å gjennomføretiltak basert på egen arbeidsmiljøundersøkelse": Antall svarVi har fått tilstrekkelig støtte til å gjennomføretiltak basert på egen arbeidsmiljøundersøkelseEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Oppfølging av arbeidsmiljøundersøkelser
        - img "Vi har opparbeidet oss nødvendig kompetansetil å følge opp fremtidigearbeidsmiljøundersøkelser": Antall svarVi har opparbeidet oss nødvendig kompetansetil å følge opp fremtidigearbeidsmiljøundersøkelserEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Livsfaseorientert personalpolitikk
        - img "Vi har en personalpolitikk som ivaretar ansattesbehov i ulike deler av livet (f.eks. graviditet,førpensjon)": Antall svarVi har en personalpolitikk som ivaretar ansattesbehov i ulike deler av livet (f.eks. graviditet,førpensjon)EnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Livsfaseorientert personalpolitikk
        - img "Vi har utarbeidet gode rutiner for hvordan vitilrettelegger ansattes arbeid i ulike deler avlivet": Antall svarVi har utarbeidet gode rutiner for hvordan vitilrettelegger ansattes arbeid i ulike deler avlivetEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Psykisk helse
        - img "Vi får tilbakemeldinger om at ansatte medpsykiske plager blir godt ivaretatt": Antall svarVi får tilbakemeldinger om at ansatte medpsykiske plager blir godt ivaretattEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Psykisk helse
        - img "Som leder, tillitsvalgt eller verneombud har jegopparbeidet meg ferdigheter til å møte og støtteansatte med psykiske plager": Antall svarSom leder, tillitsvalgt eller verneombud har jegopparbeidet meg ferdigheter til å møte og støtteansatte med psykiske plagerEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Psykisk helse
        - img "Vi jobber kontinuerlig for å redusere stigmarundt psykiske plager": Antall svarVi jobber kontinuerlig for å redusere stigmarundt psykiske plagerEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: HelseIArbeid
        - img "Vi har fått økt kompetanse om tilrettelegging foransatte med muskel-, skjelett- og psykiskeplager": Antall svarVi har fått økt kompetanse om tilrettelegging foransatte med muskel-, skjelett- og psykiskeplagerEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: HelseIArbeid
        - img "Ansatte ønsker i større grad å jobbe til tross formuskel-, skjelett- og psykiske plager": Antall svarAnsatte ønsker i større grad å jobbe til tross formuskel-, skjelett- og psykiske plagerEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Veien videre
        - img "Vi har opparbeidet oss et godt grunnlag for åjobbe videre med arbeidsmiljøet vårt": Antall svarVi har opparbeidet oss et godt grunnlag for åjobbe videre med arbeidsmiljøet vårtEnigLitt enigLitt uenigUenigVet ikke012
        - paragraph: Veien videre
        - img "Vi har utarbeidet konkrete planer for hvordan viskal videreutvikle arbeidsmiljøet vårt": Antall svarVi har utarbeidet konkrete planer for hvordan viskal videreutvikle arbeidsmiljøet vårtEnigLitt enigLitt uenigUenigVet ikke012
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
