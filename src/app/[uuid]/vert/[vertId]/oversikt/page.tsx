import type { Metadata } from "next";
import React from "react";
import OversiktBody from "./OversiktBody";
import HeaderVert from "@/app/_components/HeaderVert";
import { Page } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import FooterOversikt from "./FooterOversikt";

export const metadata: Metadata = {
  title: "Oversikt",
};

export default function Oversiktside({
  params,
}: {
  params: { uuid: string; vertId: string };
}) {
  return (
    <Page footer={<FooterOversikt />} background="bg-subtle">
      <HeaderVert spørreundersøkelseId={params.uuid} vertId={params.vertId} />
      <PageBlock>
        <OversiktBody
          spørreundersøkelseId={params.uuid}
          vertId={params.vertId}
        />
      </PageBlock>
    </Page>
  );
}
