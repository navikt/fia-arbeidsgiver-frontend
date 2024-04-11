"use client";

import { temaResultatDTO } from "@/app/_types/resultatDTO";
import HeaderBleed from "@/app/_components/HeaderBleed";
import { BodyShort, Heading, Page, VStack } from "@navikt/ds-react";
import { StatusPåDeltaker } from "@/app/_components/StatusPåDeltaker/StatusPåDeltaker";
import TemaGraf from "@/app/_components/Resultatgraf/TemaGraf";
import React from "react";
import HeaderVert from "@/app/_components/HeaderVert";
import { PageBlock } from "@navikt/ds-react/Page";

export function ResultatRenderer({
  tema,
  spørreundersøkelseId,
  vertId,
}: {
  tema: temaResultatDTO;
  spørreundersøkelseId: string;
  vertId: string;
}) {
  return (
    <>
      <HeaderVert spørreundersøkelseId={spørreundersøkelseId} vertId={vertId} />
      <Page contentBlockPadding="none">
        <PageBlock gutters width="lg">
          <HeaderBleed>
            <VStack>
              <Heading size="medium">Temaresultatside</Heading>
              <BodyShort size="medium">{tema.tema}</BodyShort>
            </VStack>
            <StatusPåDeltaker
              spørreundersøkelseId={spørreundersøkelseId}
              vertId={vertId}
            />
          </HeaderBleed>
          <TemaGraf tema={tema} />
        </PageBlock>
      </Page>
    </>
  );
}
