"use client";

import type { Metadata } from "next";
import { Page, VStack } from "@navikt/ds-react";
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
  temaId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaId: string;
}) {
  const { data: listeOverTemaer } = useTemaoversikt(
    spørreundersøkelseId,
    vertId,
  );

  return (
    listeOverTemaer && (
      <Page contentBlockPadding="none" footer={<FooterOversikt />}>
        <HeaderVert
          spørreundersøkelseId={spørreundersøkelseId}
          vertId={vertId}
        />
        <Page.Block>
          <VStack gap="4">
            {listeOverTemaer.map((temaoversikt, index) => (
              <OversiktBleedVert
                key={index}
                delnummer={index + 1}
                temaoversikt={temaoversikt}
              />
            ))}
          </VStack>
        </Page.Block>
      </Page>
    )
  );
}
