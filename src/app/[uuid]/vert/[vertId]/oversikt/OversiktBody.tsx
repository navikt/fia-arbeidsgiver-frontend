"use client";

import { Alert, HStack, Heading, Loader, VStack } from "@navikt/ds-react";
import React from "react";
import { OversiktBleedVert } from "@/app/[uuid]/vert/[vertId]/oversikt/OversiktBleedVert";
import { useTemaoversikt } from "@/app/_api_hooks/vert/useTemaoversikt";
import oversiktStyles from "./oversikt.module.css";

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
    return (
      <Alert variant={"error"} role="alert" aria-live="polite">
        {error.message}
      </Alert>
    );
  }

  return (
    listeOverTemaer && (
      <HStack
        gap="4"
        align="center"
        justify="center"
        className={oversiktStyles.bodyContainer}
      >
        {listeOverTemaer.map((temaoversikt, index) => (
          <OversiktBleedVert
            key={index}
            vertId={vertId}
            spørreundersøkelseId={spørreundersøkelseId}
            temaoversikt={temaoversikt}
          />
        ))}
      </HStack>
    )
  );
}
