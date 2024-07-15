"use client";

import HeaderVert from "../../../_components/HeaderVert";
import { Heading, Page, VStack, Loader, Alert } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { TemaGrafMedDatahenting } from "../../../_components/Resultatgraf/TemaGraf";
import React, { useEffect, useState } from "react";
import { useTemaoversikter } from "../../../_api_hooks/vert/useTemaoversikter";
import { avsluttTema } from "../../../_api_hooks/vert/avsluttTema";
import Headerlinje from "../../../_components/Headerlinje";
import resultaterStyles from "./resultater.module.css";

export function TotalresultatRenderer({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  const { data: listeOverTemaer, error } = useTemaoversikter(
    spørreundersøkelseId,
  );

  const [temaErAvsluttet, setTemaErAvsluttet] = useState<{
    [temaId: string]: boolean;
  }>({});

  useEffect(() => {
    if (listeOverTemaer) {
      listeOverTemaer.forEach((tema) => {
        avsluttTema(spørreundersøkelseId, tema.id)
          .then(() => {
            setTemaErAvsluttet((prev) => ({ ...prev, [tema.id]: true }));
          })
          .catch((error) => {
            console.error(`Kunne ikke avslutte tema ${tema.id}`, error);
          });
      });
    }
  }, [spørreundersøkelseId, listeOverTemaer]);

  return (
    <>
      <HeaderVert spørreundersøkelseId={spørreundersøkelseId}/>
      <Page contentBlockPadding="none" background="bg-subtle">
        <PageBlock gutters width="2xl">
          {error && (
            <Alert variant="error" role="alert" aria-live="polite">
              {error?.message}
            </Alert>
          )}
          {listeOverTemaer ? (
            listeOverTemaer.map(
              (tema) =>
                temaErAvsluttet[tema.id] && (
                  <React.Fragment key={tema.id}>
                    <Headerlinje tittel={tema?.navn} />
                    <TemaGrafMedDatahenting
                      temaId={tema.id}
                      spørreundersøkelseId={spørreundersøkelseId}
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
  );
}
