import React from "react";
import type { Metadata } from "next";
import { Page } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { IntrosideBody } from "./IntrosideBody";

export const metadata: Metadata = {
  title: "Temaside",
};

export default function Temastartside({
  params,
}: {
  params: { uuid: string; temaId: number };
}) {
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
