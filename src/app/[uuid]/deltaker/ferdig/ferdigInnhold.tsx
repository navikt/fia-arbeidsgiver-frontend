"use client";

import { BodyShort, VStack } from "@navikt/ds-react";
import React from "react";
import { deleteCookie } from "cookies-next";
import {
  SESSION_ID_STORAGE_KEY,
  SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY,
  SPØRREUNDERSØKELSE_ID_STORAGE_KEY,
} from "@/utils/consts";

export function FerdigInnhold() {
  React.useEffect(() => {
    deleteCookie(SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY);
    deleteCookie(SPØRREUNDERSØKELSE_ID_STORAGE_KEY);
    deleteCookie(SESSION_ID_STORAGE_KEY);
  });

  return (
    <VStack gap={"4"} align={"center"}>
      <BodyShort>Bra jobbet! IA kartleggingen er fullført.</BodyShort>
      <BodyShort>Takk for deltakelsen!</BodyShort>
      <BodyShort>Rådgiveren sier litt om hva som skjer videre.</BodyShort>
    </VStack>
  );
}
