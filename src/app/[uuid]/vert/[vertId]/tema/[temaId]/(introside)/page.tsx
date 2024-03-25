import React from "react";
import type { Metadata } from "next";
import { Page } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { IntrosideBody } from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/(introside)/IntrosideBody";
import { paramTilTema } from "@/utils/spørreundersøkelsesUtils";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Temastartside({
  params,
}: {
  params: { uuid: string; vertId: string; temaId: string };
}) {
  const HARDKODET_DELNUMMER = 42;
  const HARDKODET_INTROTEKST =
    "Partssamarbeid er essensielt i virksomheter fordi det bidrar til et godt forebyggende arbeidsmiljø og reduksjon av antall tapte dagsverk. Partssamarbeidet anerkjenner og utnytter kompetansen og ansvarsområdene til verneombud, tillitsvalgte og ledere, noe som skaper en “utvidet ledelseskapasitet”.";
  const HARDKODET_INTROTITTEL = "Partssamarbeid";
  return (
    <Page contentBlockPadding="none">
      <PageBlock gutters width="lg">
        <IntrosideBody
          spørreundersøkelseId={params.uuid}
          vertId={params.vertId}
          temaId={paramTilTema(params.temaId)}
          introtittel={HARDKODET_INTROTITTEL}
          delnummer={HARDKODET_DELNUMMER}
          introtekst={HARDKODET_INTROTEKST}
        />
      </PageBlock>
    </Page>
  );
}
