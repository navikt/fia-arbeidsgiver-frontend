import type { Metadata } from "next";
import React from "react";
import { dummySpørsmålMedSvarPerTema } from "../dummyData";
import { PageBlock } from "@navikt/ds-react/Page";
import { Page } from "@navikt/ds-react";
import { ResultatRenderer } from "./ResultatRenderer";

export const metadata: Metadata = {
  title: "Resultat",
};

export default function Temaresultatside({
  params,
}: {
  params: { uuid: string; vertId: string; temaId: number };
}) {
  const dummySpmOgSvarForTema = dummySpørsmålMedSvarPerTema[0];
  return (
    <Page contentBlockPadding="none">
      <PageBlock gutters width="lg">
        <ResultatRenderer
          tema={dummySpmOgSvarForTema}
          vertId={params.vertId}
          spørreundersøkelseId={params.uuid}
        />
      </PageBlock>
    </Page>
  );
}
