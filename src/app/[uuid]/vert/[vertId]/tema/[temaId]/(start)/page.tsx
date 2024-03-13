// noinspection HtmlUnknownTarget

import React from "react";
import type { Metadata } from "next";
import {
  BodyLong,
  BodyShort,
  Box,
  Heading,
  Page,
  VStack,
} from "@navikt/ds-react";
import Startlenke from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/(start)/Startlenke";
import HeaderBleed from "@/app/_components/HeaderBleed";
import { Deltakelsesstatus } from "@/app/_components/Deltakelsesstatus";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Temastartside({
  params,
}: {
  params: { uuid: string; vertId: string; temaId: string };
}) {
  const sideinnhold = {
    tittel: "Partssamarbeid",
    delnummer: 1,
    undertittel:
      "Målet er å sammen identifisere virksomhetens behov og bli enige om hvilke av NAVs IA-tjenester som best kan bidra til å imøtekomme virksomhetens behov.",
    brødtekst:
      "Partssamarbeidet er en ressurs for utvikling av arbeidsmiljøet og reduksjon av antall tapte dagsverk på den enkelte arbeidsplass.",
  };
  return (
    <Page contentBlockPadding="none">
      <Page.Block gutters width="lg">
        <HeaderBleed>
          <VStack>
            <BodyShort size="medium">Del {sideinnhold.delnummer}</BodyShort>
            <Heading size="medium">{sideinnhold.tittel}</Heading>
          </VStack>
          <Deltakelsesstatus
            spørreundersøkelseId={params.uuid}
            vertId={params.vertId}
          />
        </HeaderBleed>
        <Infoblokk
          tittel={sideinnhold.tittel}
          undertittel={sideinnhold.undertittel}
          brødtekst={sideinnhold.brødtekst}
        />
        <Startlenke
          temaId={params.temaId}
          uuid={params.uuid}
          vertId={params.vertId}
        />
      </Page.Block>
    </Page>
  );
}

function Infoblokk({
  tittel,
  undertittel,
  brødtekst,
}: {
  tittel: string;
  undertittel: string;
  brødtekst: string;
}) {
  return (
    <Box borderRadius="xlarge" padding="12" background="surface-selected">
      <Heading size="small" spacing>
        {tittel}
      </Heading>
      <BodyShort weight="semibold" spacing>
        {undertittel}
      </BodyShort>
      <BodyLong>{brødtekst}</BodyLong>
    </Box>
  );
}
