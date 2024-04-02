"use client";

import type { Metadata } from "next";
import { Alert, Heading, Loader, VStack } from "@navikt/ds-react";
import React from "react";
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
  const {
    data: listeOverTemaer,
    isLoading,
    error,
  } = useTemaoversikt(spørreundersøkelseId, vertId);

  if (isLoading) {
    return (
      <VStack gap={"4"} align={"center"} justify={"center"}>
        <Heading size={"large"}>Laster oversikt</Heading>
        <Loader size="3xlarge" title="Venter..." />
      </VStack>
    );
  }

  if (error) {
    return <Alert variant={"error"}>{error.message}</Alert>;
  }

  return (
    listeOverTemaer && (
      <VStack gap="4">
        {listeOverTemaer.map((temaoversikt, index) => (
          <OversiktBleedVert key={index} temaoversikt={temaoversikt} />
        ))}
      </VStack>
    )
  );
}
