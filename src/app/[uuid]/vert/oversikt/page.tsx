import type { Metadata } from "next";
import React from "react";
import OversiktBody from "./OversiktBody";
import HeaderVert from "@/app/_components/HeaderVert";
import { Page } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";

export const metadata: Metadata = {
  title: "Oversikt",
};

export default function Oversiktside({ params }: { params: { uuid: string } }) {
  return (
    <Page background="bg-subtle">
      <HeaderVert spørreundersøkelseId={params.uuid} />
      <PageBlock>
        <OversiktBody spørreundersøkelseId={params.uuid} />
      </PageBlock>
    </Page>
  );
}
