import type { Metadata } from "next";
import React from "react";
import { dummySpørsmålMedSvarPerTema } from "@/app/[uuid]/vert/[vertId]/resultater/dummyData";
import { Heading, Page, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import TemaGraf from "@/app/_components/Resultatgraf/TemaGraf";
import HeaderBleed from "@/app/_components/HeaderBleed";
import { StatusPåDeltaker } from "@/app/_components/StatusPåDeltaker/StatusPåDeltaker";
import { temaResultatDTO } from "@/app/_types/resultatDTO";

export const metadata: Metadata = {
  title: "Resultat",
};

export default function Temaresultatside({
  params,
}: {
  params: { uuid: string; vertId: string };
}) {
  return (
    <Page contentBlockPadding="none">
      <PageBlock gutters width="lg">
        <TotalresultatRenderer
          spørreundersøkelseId={params.uuid}
          vertId={params.vertId}
          temaer={dummySpørsmålMedSvarPerTema}
        />
      </PageBlock>
    </Page>
  );
}

function TotalresultatRenderer({
  spørreundersøkelseId,
  vertId,
  temaer,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaer: temaResultatDTO[];
}) {
  return (
    <>
      <HeaderBleed>
        <VStack>
          <Heading size="medium">Temaresultatside</Heading>
        </VStack>
        <StatusPåDeltaker
          spørreundersøkelseId={spørreundersøkelseId}
          vertId={vertId}
        />
      </HeaderBleed>
      {temaer.map((tema) => (
        <TemaGraf key={tema.tema} tema={tema} />
      ))}
    </>
  );
}
