"use client";

import { Heading, VStack } from "@navikt/ds-react";
import deltakerStyles from "./sporsmalsside.module.css";
import React from "react";
import { SpørsmåloversiktDto } from "@/app/_types/SpørsmåloversiktDto";
import { Framdrift } from "@/app/[uuid]/deltaker/[temaId]/[sporsmalId]/Framdrift";

export function SpørsmålHeadingDeltaker({
  spørsmåloversikt,
}: {
  spørsmåloversikt: SpørsmåloversiktDto;
}) {
  return (
    spørsmåloversikt && (
      <VStack
        justify={"start"}
        gap={"2"}
        className={deltakerStyles.spørsmålsheader}
      >
        <Heading size="medium">{spørsmåloversikt.temanavn}</Heading>
        <Framdrift
          spørsmålnummer={spørsmåloversikt.spørsmålnummer}
          totaltAntallSpørsmål={spørsmåloversikt.antallSpørsmål}
        />
      </VStack>
    )
  );
}
