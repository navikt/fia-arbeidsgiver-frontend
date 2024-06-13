"use client";

import TemaGraf from "@/app/_components/Resultatgraf/TemaGraf";
import React, { useEffect, useState } from "react";
import { avsluttTema } from "@/app/_api_hooks/vert/avsluttTema";
import { useTemaResultat } from "@/app/_api_hooks/vert/useTemaresultater";
import Headerlinje from "@/app/_components/Headerlinje";
import { Heading, VStack, Loader, Alert } from "@navikt/ds-react";
import resultaterStyles from "../resultater.module.css";
import NavigerTilNesteTemaKnapp from "@/app/[uuid]/vert/[vertId]/resultater/[temaId]/NavigerTilNesteTemaKnapp";

export function ResultatRenderer({
  temaId,
  spørreundersøkelseId,
  vertId,
}: {
  temaId: number;
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const [erAvsluttet, setErAvsluttet] = useState(false);

  useEffect(() => {
    avsluttTema(spørreundersøkelseId, vertId, temaId)
      .then(() => setErAvsluttet(true))
      .catch((error) =>
        console.error(`Kunne ikke avslutte tema: ${temaId}`, error),
      );
  }, [spørreundersøkelseId, vertId, temaId]);

  const { data: tema, error } = useTemaResultat(
    spørreundersøkelseId,
    vertId,
    temaId,
  );

  if (tema === undefined || !erAvsluttet) {
    return (
      <>
        <Headerlinje tittel={tema?.beskrivelse} />
        <VStack
          gap={"4"}
          align={"center"}
          justify={"center"}
          className={resultaterStyles.loadingStack}
        >
          <Heading size={"large"}>Laster resultater</Heading>
          <Loader size="3xlarge" title="Venter..." />
          {error && (
            <Alert variant="error" role="alert" aria-live="polite">
              {error.message}
            </Alert>
          )}
        </VStack>
      </>
    );
  }

  return (
    <>
      <Headerlinje tittel={tema?.beskrivelse}>
        <NavigerTilNesteTemaKnapp
          vertId={vertId}
          spørreundersøkelseId={spørreundersøkelseId}
          temaId={temaId}
        />
      </Headerlinje>
      <TemaGraf key={temaId} tema={erAvsluttet ? tema : undefined} />
    </>
  );
}
