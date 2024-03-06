"use client";

import type { Metadata } from "next";
import { Page, VStack } from "@navikt/ds-react";
import React from "react";
import FooterOversikt from "./FooterOversikt";
import HeaderVert from "@/app/_components/HeaderVert";
import { SpørsmålBleedOversikt } from "@/app/[uuid]/vert/[vertId]/oversikt/SpørsmålBleedOversikt";

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
  const statusDelnummer = 1; //TODO: hent i Dellinje
  return (
    <Page contentBlockPadding="none" footer={<FooterOversikt />}>
      <HeaderVert spørreundersøkelseId={spørreundersøkelseId} vertId={vertId} />
      <Page.Block>
        <VStack gap="4">
          <SpørsmålBleedOversikt
            key={statusDelnummer}
            vertId={vertId}
            statusDelnummer={statusDelnummer}
            spørreundersøkelseId={spørreundersøkelseId}
          />
        </VStack>
      </Page.Block>
    </Page>
  );
}
