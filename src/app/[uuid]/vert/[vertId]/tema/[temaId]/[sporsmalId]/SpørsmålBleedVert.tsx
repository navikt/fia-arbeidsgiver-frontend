"use client";

import { BodyShort, Heading, VStack } from "@navikt/ds-react";
import React from "react";
import HeaderBleed from "@/app/_components/HeaderBleed";
import { StatusPåDeltakerMedSvar } from "@/app/_components/StatusPåDeltaker/StatusPåDeltakerMedSvar";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";

export function SpørsmålBleedVert({
  spørreundersøkelseId,
  vertId,
  temaId,
  spørsmålId,
  spørsmålOgSvar,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaId: number;
  spørsmålId: string;
  spørsmålOgSvar: SpørsmålsoversiktDto | undefined;
}) {
  if (spørsmålOgSvar === undefined) {
    return (
      <HeaderBleed>
        <Heading size={"medium"}>Kunne ikke laste spørsmål</Heading>
        <StatusPåDeltakerMedSvar
          spørsmålId={spørsmålId}
          spørreundersøkelseId={spørreundersøkelseId}
          temaId={temaId}
          vertId={vertId}
        />
      </HeaderBleed>
    );
  }
  return (
    spørsmålOgSvar && (
      <HeaderBleed>
        <VStack>
          <BodyShort size="medium">
            {`Del ${spørsmålOgSvar.temanummer}/${spørsmålOgSvar.antallTema}`}
          </BodyShort>
          <Heading size="medium">
            {`${spørsmålOgSvar.temabeskrivelse} - ${spørsmålOgSvar.spørsmålnummer}/${spørsmålOgSvar.antallSpørsmål}`}
          </Heading>
        </VStack>

        <StatusPåDeltakerMedSvar
          spørsmålId={spørsmålId}
          spørreundersøkelseId={spørreundersøkelseId}
          temaId={temaId}
          vertId={vertId}
        />
      </HeaderBleed>
    )
  );
}
