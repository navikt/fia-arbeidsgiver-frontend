"use client";

import { Alert, HStack, Heading, Loader, VStack } from "@navikt/ds-react";
import React from "react";
import { TemaBoks } from "@/app/[uuid]/vert/oversikt/TemaBoks";
import { useTemaoversikter } from "@/app/_api_hooks/vert/useTemaoversikter";
import oversiktStyles from "./oversikt.module.css";

export default function OversiktBody({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  const {
    data: listeOverTemaer,
    isLoading,
    error,
  } = useTemaoversikter(spørreundersøkelseId);

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
          <TemaBoks
            key={index}
            spørreundersøkelseId={spørreundersøkelseId}
            tema={temaoversikt}
          />
        ))}
      </HStack>
    )
  );
}
