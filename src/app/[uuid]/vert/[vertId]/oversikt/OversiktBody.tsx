"use client";

import type { Metadata } from "next";
import { Alert, Heading, Loader, Page, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import React from "react";
import FooterOversikt from "./FooterOversikt";
import HeaderVert from "@/app/_components/HeaderVert";
import { OversiktBleedVert } from "@/app/[uuid]/vert/[vertId]/oversikt/OversiktBleedVert";
import { useTemaoversikt } from "@/app/_api_hooks/vert/useTemaoversikt";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function OversiktBody({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const { data: listeOverTemaer, isLoading, error } = useTemaoversikt(
    spørreundersøkelseId,
    vertId,
  );

  if(isLoading) {
    return (
      <Page contentBlockPadding="none" footer={<FooterOversikt />}>
        <HeaderVert
          spørreundersøkelseId={spørreundersøkelseId}
          vertId={vertId}
        />
        <PageBlock>
          <Heading size={"large"}>Laster oversikt</Heading>
          <Loader size="3xlarge" title="Venter..." />
        </PageBlock>
      </Page>
    )
  }

  if(error) {
    return (
      <Page contentBlockPadding="none" footer={<FooterOversikt />}>
        <HeaderVert
          spørreundersøkelseId={spørreundersøkelseId}
          vertId={vertId}
        />
        <PageBlock>
          <Alert variant={"error"}>{error.message}</Alert>
        </PageBlock>
      </Page>
    )
  }

  return (
    listeOverTemaer && (
      <Page contentBlockPadding="none" footer={<FooterOversikt />}>
        <HeaderVert
          spørreundersøkelseId={spørreundersøkelseId}
          vertId={vertId}
        />
        <PageBlock>
          <VStack gap="4">
            {listeOverTemaer.map((temaoversikt, index) => (
              <OversiktBleedVert key={index} temaoversikt={temaoversikt} />
            ))}
          </VStack>
        </PageBlock>
      </Page>
    )
  );
}
