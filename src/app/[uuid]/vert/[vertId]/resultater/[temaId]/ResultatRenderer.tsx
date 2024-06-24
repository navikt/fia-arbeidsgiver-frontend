"use client";

import TemaGraf from "@/app/_components/Resultatgraf/TemaGraf";
import React, { useEffect, useState } from "react";
import { avsluttTema } from "@/app/_api_hooks/vert/avsluttTema";
import { useTemaResultat } from "@/app/_api_hooks/vert/useTemaresultater";
import Headerlinje from "@/app/_components/Headerlinje";
import { Heading, VStack, Loader, Alert } from "@navikt/ds-react";
import resultaterStyles from "../resultater.module.css";
import NavigerTilNesteTemaKnapp from "@/app/[uuid]/vert/[vertId]/resultater/[temaId]/NavigerTilNesteTemaKnapp";
import useTimeHasElapsed from "@/utils/useTimeHasElapsed";

export function ResultatRenderer({
  temaId,
  spørreundersøkelseId,
  vertId,
}: {
  temaId: number;
  spørreundersøkelseId: string;
  vertId: string;
}) {
  // Ignorer errors de første 20 sekundene etter load, ettersom vi får 403 på første load etter at vi har avsluttet tema.
  // TODO: Fjern denne når vi får fikset at beckend sender error første gang
  const visErrorOmDenFinnes = useTimeHasElapsed(20000);
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
          {error && visErrorOmDenFinnes && (
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
