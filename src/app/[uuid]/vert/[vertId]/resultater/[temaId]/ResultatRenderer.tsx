"use client";

import HeaderBleed from "@/app/_components/HeaderBleed";
import { Heading, Page } from "@navikt/ds-react";
import { StatusPåDeltaker } from "@/app/_components/StatusPåDeltaker/StatusPåDeltaker";
import TemaGraf from "@/app/_components/Resultatgraf/TemaGraf";
import React, { useEffect, useState } from "react";
import HeaderVert from "@/app/_components/HeaderVert";
import { PageBlock } from "@navikt/ds-react/Page";
import { avsluttTema } from "@/app/_api_hooks/vert/avsluttTema";

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
          {erAvsluttet && (
            <TemaGraf
              key={temaId}
              temaId={temaId}
              spørreundersøkelseId={spørreundersøkelseId}
              vertId={vertId}
            />
          )}
        </PageBlock>
      </Page>
    </>
  );
}
