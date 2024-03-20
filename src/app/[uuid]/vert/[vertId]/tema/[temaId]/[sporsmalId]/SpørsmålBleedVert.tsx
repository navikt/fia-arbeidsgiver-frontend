"use client";

import { BodyShort, Heading, VStack } from "@navikt/ds-react";
import React from "react";
import HeaderBleed from "@/app/_components/HeaderBleed";
import { finskrivTema } from "@/utils/spørreundersøkelsesUtils";
import { StatusPåDeltakerMedSvar } from "@/app/_components/StatusPåDeltaker/StatusPåDeltakerMedSvar";

export function SpørsmålBleedVert({
  spørreundersøkelseId,
  delnummer,
  spørsmålnummer,
  vertId,
  temaId,
  spørsmålId,
  antallSpørsmål,
}: {
  spørreundersøkelseId: string;
  delnummer: number;
  spørsmålnummer: number;
  vertId: string;
  temaId: string;
  spørsmålId: string;
  antallSpørsmål: number;
}) {
  return (
    <HeaderBleed>
      <VStack>
        <BodyShort size="medium">Del {delnummer}</BodyShort>
        <Heading size="medium">
          {`${finskrivTema(temaId)} - ${spørsmålnummer}/${antallSpørsmål}`}
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
