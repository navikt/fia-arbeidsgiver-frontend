"use client";

import { BodyShort, Button, VStack } from "@navikt/ds-react";
import React from "react";
import { useRouter } from "next/navigation";

export function FerdigInnhold() {
  const router = useRouter();
  return (
    <VStack gap={"4"} align={"center"}>
      <BodyShort>
        Bra jobbet! IA kartleggingen er fullført. Rådgiveren sier litt om hva
        som skjer videre.
      </BodyShort>
      <Button variant={"secondary"} onClick={() => router.push("landing")}>
        Lukk vindu
      </Button>
    </VStack>
  );
}
