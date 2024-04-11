"use client";

import {
  Bleed,
  BodyShort,
  Box,
  Heading,
  HStack,
  VStack,
} from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import deltakerStyles from "./sporsmalsside.module.css";
import React from "react";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";

export function SpørsmålBleedDeltaker({
  spørsmålOgSvar,
}: {
  spørsmålOgSvar: SpørsmålsoversiktDto | undefined;
}) {
  return (
    <Bleed
      marginInline="full"
      asChild
      reflectivePadding
      className={deltakerStyles.spørsmålsbleed}
    >
      <Box padding="5" className={kartleggingStyles.bleedKlar}>
        <HStack className={deltakerStyles.bleedInnhold}>
          {spørsmålOgSvar && (
            <VStack>
              <Heading size="small">{spørsmålOgSvar.temabeskrivelse}</Heading>
              <BodyShort>{`Spørsmål ${spørsmålOgSvar.spørsmålnummer} av ${spørsmålOgSvar.antallSpørsmål}`}</BodyShort>
            </VStack>
          )}
        </HStack>
      </Box>
    </Bleed>
  );
}
