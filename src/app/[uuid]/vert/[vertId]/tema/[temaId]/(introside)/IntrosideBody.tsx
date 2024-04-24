"use client";

import { Alert, Heading, Loader, VStack } from "@navikt/ds-react";
import React from "react";
import { useTemaoversiktOverEttTema } from "@/app/_api_hooks/vert/useTemaoversiktOverEttTema";
import { Infoblokk } from "./Infoblokk";

export function IntrosideBody({
  spørreundersøkelseId,
  vertId,
  temaId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaId: number;
}) {
  const {
    data: temaoversikt,
    isLoading,
    error,
  } = useTemaoversiktOverEttTema(spørreundersøkelseId, vertId, temaId);

  if (isLoading) {
    return (
      <VStack gap={"4"} align={"center"} justify={"center"}>
        <Heading size={"large"}>Laster tema</Heading>
        <Loader size="3xlarge" title="Venter..." />
      </VStack>
    );
  }

  if (error) {
    return <Alert variant={"error"}>{error.message}</Alert>;
  }

  return (
    temaoversikt && (
      <Infoblokk
        temaoversikt={temaoversikt}
        tittel={temaoversikt.beskrivelse}
        undertittel={temaoversikt.introtekst}
      />
    )
  );
}
