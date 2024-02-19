"use client";

import { BodyShort, VStack } from "@navikt/ds-react";
import React from "react";
import CookieHandler from "@/utils/CookieHandler";

export function FerdigInnhold() {
  React.useEffect(() => {
    CookieHandler.clear();
  });

  return (
    <VStack gap={"4"} align={"center"}>
      <BodyShort>Bra jobbet! IA kartleggingen er fullført.</BodyShort>
      <BodyShort>Takk for deltakelsen!</BodyShort>
      <BodyShort>Rådgiveren sier litt om hva som skjer videre.</BodyShort>
    </VStack>
  );
}
