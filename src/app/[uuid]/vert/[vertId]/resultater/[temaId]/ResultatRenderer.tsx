"use client";

import HeaderBleed from "@/app/_components/HeaderBleed";
import { Heading, Page, VStack } from "@navikt/ds-react";
import { StatusPåDeltaker } from "@/app/_components/StatusPåDeltaker/StatusPåDeltaker";
import TemaGraf from "@/app/_components/Resultatgraf/TemaGraf";
import React from "react";
import HeaderVert from "@/app/_components/HeaderVert";
import { PageBlock } from "@navikt/ds-react/Page";

export function ResultatRenderer({
  temaId,
  spørreundersøkelseId,
  vertId,
}: {
  temaId: number;
  spørreundersøkelseId: string;
  vertId: string;
}) {
  return (
    <>
      <HeaderVert spørreundersøkelseId={spørreundersøkelseId} vertId={vertId} />
      <Page contentBlockPadding="none">
        <PageBlock gutters width="lg">
          <HeaderBleed>
            <Heading size="medium">Temaresultatside</Heading>
            <StatusPåDeltaker
              spørreundersøkelseId={spørreundersøkelseId}
              vertId={vertId}
            />
          </HeaderBleed>
          <TemaGraf
            key={temaId}
            temaId={temaId}
            spørreundersøkelseId={spørreundersøkelseId}
            vertId={vertId}
          />
        </PageBlock>
      </Page>
    </>
  );
}
