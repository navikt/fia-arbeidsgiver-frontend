"use client";

import { Bleed, BodyShort, Box, Heading, HStack } from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import deltakerStyles from "@/app/[uuid]/deltaker/[temaId]/[sporsmalId]/sporsmalsside.module.css";
import React from "react";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";

export function SpørsmålBleedDeltaker({
  spørsmålOgSvar,
}: {
  spørsmålOgSvar: SpørsmålsoversiktDto | undefined;
}) {
  return (
    <Bleed marginInline="full" asChild reflectivePadding>
      <Box padding="5" className={kartleggingStyles.bleedKlar}>
        <HStack className={deltakerStyles.bleedInnhold}>
          {spørsmålOgSvar && (
            <>
              <Heading size="small">{spørsmålOgSvar.temabeskrivelse}</Heading>
              <BodyShort>{`${spørsmålOgSvar.spørsmålnummer} av ${spørsmålOgSvar.antallSpørsmål}`}</BodyShort>
            </>
          )}
        </HStack>
      </Box>
    </Bleed>
  );
}
