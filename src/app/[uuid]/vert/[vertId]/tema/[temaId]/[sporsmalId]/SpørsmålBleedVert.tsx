"use client";

import { BodyShort, Heading, VStack } from "@navikt/ds-react";
import React from "react";
import HeaderBleed from "@/app/_components/HeaderBleed";
import { StatusPåDeltakerMedSvar } from "@/app/_components/StatusPåDeltaker/StatusPåDeltakerMedSvar";

export function SpørsmålBleedVert({
  spørreundersøkelseId,
  temabeskrivelse,
  delnummer,
  spørsmålnummer,
  vertId,
  temaId,
  spørsmålId,
  antallSpørsmål,
}: {
  spørreundersøkelseId: string;
  temabeskrivelse: string;
  delnummer: number;
  spørsmålnummer: number;
  vertId: string;
  temaId: number;
  spørsmålId: string;
  antallSpørsmål: number;
}) {
  return (
    <HeaderBleed>
      <VStack>
        <BodyShort size="medium">Del {delnummer}</BodyShort>
        <Heading size="medium">
          {`${temabeskrivelse} - ${spørsmålnummer}/${antallSpørsmål}`}
        </Heading>
      </VStack>

      <StatusPåDeltakerMedSvar
        spørsmålId={spørsmålId}
        spørreundersøkelseId={spørreundersøkelseId}
        temaId={temaId}
        vertId={vertId}
      />
    </HeaderBleed>
  );
}
