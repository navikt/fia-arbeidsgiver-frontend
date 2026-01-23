import React from "react";
import type { Metadata } from "next";
import { Page } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { IntrosideBody } from "@/app/[uuid]/vert/tema/[temaId]/(introside)/IntrosideBody";

export const metadata: Metadata = {
  title: "Temaside",
};

export default async function Temastartside(props: {
  params: Promise<{ uuid: string; temaId: number }>;
}) {
  const params = await props.params;
  return (
    <Page contentBlockPadding="none" background="bg-subtle">
      <PageBlock gutters width="lg">
        <IntrosideBody
          spørreundersøkelseId={params.uuid}
          temaId={params.temaId}
        />
      </PageBlock>
    </Page>
  );
}
