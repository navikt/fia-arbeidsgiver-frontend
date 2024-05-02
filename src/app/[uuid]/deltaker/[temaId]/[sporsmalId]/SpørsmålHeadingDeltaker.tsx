"use client";

import { Heading, VStack } from "@navikt/ds-react";
import deltakerStyles from "./sporsmalsside.module.css";
import React from "react";
import { SpørsmåloversiktDTO } from "@/app/_types/SpørsmåloversiktDTO";
import { Framdrift } from "@/app/[uuid]/deltaker/[temaId]/[sporsmalId]/Framdrift";

export function SpørsmålHeadingDeltaker({
  spørsmålOgSvar,
}: {
  spørsmålOgSvar: SpørsmåloversiktDTO;
}) {
  return (
    spørsmålOgSvar && (
      <VStack
        justify={"start"}
        gap={"2"}
        className={deltakerStyles.spørsmålsheader}
      >
        <Heading size="medium">{spørsmålOgSvar.temabeskrivelse}</Heading>
        <Framdrift
          spørsmålnummer={spørsmålOgSvar.spørsmålnummer}
          totaltAntallSpørsmål={spørsmålOgSvar.antallSpørsmål}
        />
      </VStack>
    )
  );
}
