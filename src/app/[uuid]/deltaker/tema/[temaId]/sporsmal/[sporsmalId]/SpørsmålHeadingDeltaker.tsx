"use client";

import { Heading, VStack } from "@navikt/ds-react";
import deltakerStyles from "./sporsmalsside.module.css";
import React from "react";
import { DeltakerSpørsmålDto } from "@/app/_types/DeltakerSpørsmålDto";
import { Framdrift } from "@/app/[uuid]/deltaker/tema/[temaId]/sporsmal/[sporsmalId]/Framdrift";

export function SpørsmålHeadingDeltaker({
  deltakerSpørsmål,
}: {
  deltakerSpørsmål: DeltakerSpørsmålDto;
}) {
  return (
    deltakerSpørsmål && (
      <VStack
        justify={"start"}
        gap={"2"}
        className={deltakerStyles.spørsmålsheader}
      >
        <Heading size="medium">{deltakerSpørsmål.temanavn}</Heading>
        <Framdrift
          spørsmålnummer={deltakerSpørsmål.spørsmålnummer}
          totaltAntallSpørsmål={deltakerSpørsmål.antallSpørsmål}
          temanavn={deltakerSpørsmål.temanavn}
        />
      </VStack>
    )
  );
}
