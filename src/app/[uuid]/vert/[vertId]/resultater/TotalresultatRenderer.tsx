"use client";

import HeaderVert from "@/app/_components/HeaderVert";
import { Heading, Page, VStack, Loader } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { TemaGrafMedDatahenting } from "@/app/_components/Resultatgraf/TemaGraf";
import React, { useEffect, useState } from "react";
import { useTemaoversikt } from "@/app/_api_hooks/vert/useTemaoversikt";
import { avsluttTema } from "@/app/_api_hooks/vert/avsluttTema";
import Headerlinje from "@/app/_components/Headerlinje";
import resultaterStyles from "./resultater.module.css";

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
        <Page contentBlockPadding="none" background="bg-subtle">
          <PageBlock gutters width="lg">
            {listeOverTemaer ? (
              listeOverTemaer.map(
                (tema) =>
                  temaErAvsluttet[tema.temaId] && (
                    <React.Fragment key={tema.temaId}>
                      <Headerlinje tittel={tema?.beskrivelse} />
                      <TemaGrafMedDatahenting
                        temaId={tema.temaId}
                        spørreundersøkelseId={spørreundersøkelseId}
                        vertId={vertId}
                      />
                    </React.Fragment>
                  ),
              )
            ) : (
              <VStack
                gap={"4"}
                align={"center"}
                justify={"center"}
                className={resultaterStyles.loadingStack}
              >
                <Heading size={"large"}>Laster resultater</Heading>
                <Loader size="3xlarge" title="Venter..." />
              </VStack>
            )}
          </PageBlock>
        </Page>
      </>
    )
  );
}
