"use client";

import HeaderVert from "@/app/_components/HeaderVert";
import { Heading, Page, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import HeaderBleed from "@/app/_components/HeaderBleed";
import { StatusPåDeltaker } from "@/app/_components/StatusPåDeltaker/StatusPåDeltaker";
import TemaGraf from "@/app/_components/Resultatgraf/TemaGraf";
import React, { useEffect, useState } from "react";
import { useTemaoversikt } from "@/app/_api_hooks/vert/useTemaoversikt";
import { avsluttTema } from "@/app/_api_hooks/vert/avsluttTema";

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

  const [temaErAvsluttet, setTemaErAvsluttet] = useState<{
    [temaId: string]: boolean;
  }>({});

  useEffect(() => {
    if (listeOverTemaer) {
      listeOverTemaer.forEach((tema) => {
        avsluttTema(spørreundersøkelseId, vertId, tema.temaId)
          .then(() => {
            setTemaErAvsluttet((prev) => ({ ...prev, [tema.temaId]: true }));
          })
          .catch((error) => {
            console.error(`Kunne ikke avslutte tema ${tema.temaId}`, error);
          });
      });
    }
  }, [spørreundersøkelseId, vertId, listeOverTemaer]);

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
            {listeOverTemaer &&
              listeOverTemaer.map(
                (tema) =>
                  temaErAvsluttet[tema.temaId] && (
                    <TemaGraf
                      key={tema.temaId}
                      temaId={tema.temaId}
                      spørreundersøkelseId={spørreundersøkelseId}
                      vertId={vertId}
                    />
                  ),
              )}
          </PageBlock>
        </Page>
      </>
    )
  );
}
