"use client";

import { BodyShort, Heading, VStack } from "@navikt/ds-react";
import React from "react";
import HeaderBleed from "@/app/_components/HeaderBleed";
import { finskrivTema } from "@/utils/spørreundersøkelsesUtils";
import { StatusPåDeltakerMedSvar } from "@/app/_components/StatusPåDeltaker/StatusPåDeltakerMedSvar";
import { Tema } from "@/app/_types/tema";

export function SpørsmålBleedVert({
  spørreundersøkelseId,
  delnummer,
  spørsmålnummer,
  vertId,
  tema,
  spørsmålId,
  antallSpørsmål,
}: {
  spørreundersøkelseId: string;
  delnummer: number;
  spørsmålnummer: number;
  vertId: string;
  tema: Tema;
  spørsmålId: string;
  antallSpørsmål: number;
}) {
  return (
    <HeaderBleed>
      <VStack>
        <BodyShort size="medium">Del {delnummer}</BodyShort>
        <Heading size="medium">
          {`${finskrivTema(tema)} - ${spørsmålnummer}/${antallSpørsmål}`}
        </Heading>
      </VStack>

      <StatusPåDeltakerMedSvar
        spørsmålId={spørsmålId}
        spørreundersøkelseId={spørreundersøkelseId}
        tema={tema}
        vertId={vertId}
      />
    </HeaderBleed>
  );
}
