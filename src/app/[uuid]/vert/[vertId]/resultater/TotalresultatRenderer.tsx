"use client";

import HeaderVert from "@/app/_components/HeaderVert";
import { Heading, Page, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import HeaderBleed from "@/app/_components/HeaderBleed";
import { StatusPåDeltaker } from "@/app/_components/StatusPåDeltaker/StatusPåDeltaker";
import TemaGraf from "@/app/_components/Resultatgraf/TemaGraf";
import React from "react";
import { useTemaoversikt } from "@/app/_api_hooks/vert/useTemaoversikt";

export function TotalresultatRenderer({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const { data: listeOverTemaer } = useTemaoversikt(
    spørreundersøkelseId,
    vertId,
  );
  return (
    listeOverTemaer && (
      <>
        <HeaderVert
          spørreundersøkelseId={spørreundersøkelseId}
          vertId={vertId}
        />
        <Page contentBlockPadding="none">
          <PageBlock gutters width="lg">
            <HeaderBleed>
              <VStack>
                <Heading size="medium">Temaresultatside</Heading>
              </VStack>
              <StatusPåDeltaker
                spørreundersøkelseId={spørreundersøkelseId}
                vertId={vertId}
              />
            </HeaderBleed>
            {listeOverTemaer.map((tema) => (
              <TemaGraf
                key={tema.temaId}
                temaId={tema.temaId}
                spørreundersøkelseId={spørreundersøkelseId}
                vertId={vertId}
              />
            ))}
          </PageBlock>
        </Page>
      </>
    )
  );
}
