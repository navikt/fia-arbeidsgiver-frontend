"use client";

import { BodyShort, Button, VStack } from "@navikt/ds-react";
import React from "react";
import { useRouter } from "next/navigation";
import { SESSION_ID_STORAGE_KEY } from "@/app/_api_hooks/bliMed";
import { SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY } from "@/app/_api_hooks/enkeltSvar";

export function FerdigInnhold() {
  const router = useRouter();
  React.useEffect(() => {
    localStorage.removeItem(SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY);
    localStorage.removeItem(SESSION_ID_STORAGE_KEY);
  });
  return (
    <VStack gap={"4"} align={"center"}>
      <BodyShort>
        Bra jobbet! IA kartleggingen er fullført. Rådgiveren sier litt om hva
        som skjer videre.
      </BodyShort>
      <Button variant={"secondary"} onClick={() => router.push("../deltaker")}>
        Lukk vindu
      </Button>
    </VStack>
  );
}
