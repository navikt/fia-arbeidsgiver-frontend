"use client";

import { Page } from "@navikt/ds-react";
import TemaGraf from "@/app/_components/Resultatgraf/TemaGraf";
import React, { useEffect, useState } from "react";
import HeaderVert from "@/app/_components/HeaderVert";
import { PageBlock } from "@navikt/ds-react/Page";
import { avsluttTema } from "@/app/_api_hooks/vert/avsluttTema";
import { useTemaResultat } from "@/app/_api_hooks/vert/useTemaresultater";
import Headerlinje from "@/app/_components/Headerlinje";

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

  const { data: tema } = useTemaResultat(spørreundersøkelseId, vertId, temaId);

  return (
    <>
      <HeaderVert spørreundersøkelseId={spørreundersøkelseId} vertId={vertId} />
      <Page contentBlockPadding="none" background="bg-subtle">
        <PageBlock gutters width="lg">
          <Headerlinje tittel={tema?.beskrivelse} />
          {erAvsluttet && <TemaGraf key={temaId} tema={tema} />}
        </PageBlock>
      </Page>
    </>
  );
}
