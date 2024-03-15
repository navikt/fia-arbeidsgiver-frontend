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
import deltakerStyles from "@/app/[uuid]/deltaker/[temaId]/[sporsmalId]/sporsmalsside.module.css";
import { finskrivTema } from "@/utils/spørreundersøkelsesUtils";
import React from "react";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/deltaker/useSpørsmålOgSvar";
import { Tema } from "@/app/_types/temaDTO";

export function SpørsmålBleedDeltaker({
  spørreundersøkelseId,
  spørsmålId,
  temaId,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
  temaId: Tema;
}) {
  const {
    data: spørsmålOgSvar,
    isLoading: lasterStatus,
    error: feilStatus,
  } = useSpørsmålOgSvar(spørreundersøkelseId, temaId, spørsmålId);

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
            <Heading size="small">{finskrivTema(temaId)}</Heading>
          </HStack>
        </Box>
      </Bleed>
    )
  );
}
