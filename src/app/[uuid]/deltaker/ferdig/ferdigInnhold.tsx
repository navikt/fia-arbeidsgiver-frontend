"use client";

import { BodyShort, VStack } from "@navikt/ds-react";
import React from "react";
import CookieHandler from "@/utils/CookieHandler";

export function FerdigInnhold({ uuid }: { uuid: string }) {
  React.useEffect(() => {
    new CookieHandler(uuid).setHarSvartAlleSpørsmål();
  });

  return (
    <VStack gap={"4"} align={"center"}>
      <BodyShort>Takk for ditt bidrag!</BodyShort>
    </VStack>
  );
}
