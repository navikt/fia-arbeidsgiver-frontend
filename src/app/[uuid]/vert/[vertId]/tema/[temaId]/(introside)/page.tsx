import React from "react";
import type { Metadata } from "next";
import { Page } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { IntrosideBody } from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/(introside)/IntrosideBody";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Temastartside({
  params,
}: {
  params: { uuid: string; vertId: string; temaId: number };
}) {
  return (
    <Page contentBlockPadding="none">
      <PageBlock gutters width="lg">
        <IntrosideBody
          spørreundersøkelseId={params.uuid}
          vertId={params.vertId}
          temaId={params.temaId}
        />
      </PageBlock>
    </Page>
  );
}
