"use client";

import {
  Alert,
  Bleed,
  Box,
  Heading,
  HStack,
  Loader,
  VStack,
} from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import deltakerStyles from "@/app/[uuid]/deltaker/sporsmal/[sporsmalId]/sporsmalsside.module.css";
import { finskrivTema } from "@/app/_types/sporreundersokelseDTO";
import React from "react";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/deltaker/useSpørsmålOgSvar";

export function SpørsmålBleedDeltaker({
  spørreundersøkelseId,
  spørsmålId,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
}) {
  const {
    data: spørsmålOgSvar,
    isLoading: lasterStatus,
    error: feilStatus,
  } = useSpørsmålOgSvar(spørreundersøkelseId, spørsmålId);

  if (lasterStatus) {
    return (
      <Bleed marginInline="full" asChild reflectivePadding>
        <Box padding="5" className={kartleggingStyles.bleedKlar}>
          <HStack justify={"center"} align={"center"}>
            <Loader variant={"inverted"} size="large" title="Venter..." />
          </HStack>
        </Box>
      </Bleed>
    );
  }
  if (feilStatus) {
    return (
      <Bleed marginInline="full" asChild reflectivePadding>
        <Box padding="5" className={kartleggingStyles.bleedKlar}>
          <HStack className={deltakerStyles.bleedInnhold}>
            <VStack align={"center"}>
              {feilStatus && (
                <Alert
                  variant={"warning"}
                  inline
                  className={kartleggingStyles.alertWarning}
                >
                  {feilStatus.message}
                </Alert>
              )}
            </VStack>
          </HStack>
        </Box>
      </Bleed>
    );
  }
  return (
      spørsmålOgSvar && (
      <Bleed marginInline="full" asChild reflectivePadding>
        <Box padding="5" className={kartleggingStyles.bleedKlar}>
          <HStack className={deltakerStyles.bleedInnhold}>
            <Heading size="small">{finskrivTema(spørsmålOgSvar.tema)}</Heading>
          </HStack>
        </Box>
      </Bleed>
    )
  );
}
