"use client";

import { useKategoristatus } from "@/app/_api_hooks/useKategoristatus";
import {
  Alert,
  Bleed,
  BodyShort,
  Box,
  HStack,
  Loader,
  VStack,
} from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import deltakerStyles from "@/app/[uuid]/deltaker/sporsmal/[sporsmalId]/sporsmalsside.module.css";
import { finskrivKategori } from "@/app/_types/sporreundersokelseDTO";
import React from "react";

export function SpørsmålBleedDeltaker({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  const {
    data: status,
    isLoading: lasterStatus,
    error: feilStatus,
  } = useKategoristatus(spørreundersøkelseId);
  const statusDelnummer = 1;

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
            <VStack>
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
    status && (
      <Bleed marginInline="full" asChild reflectivePadding>
        <Box padding="5" className={kartleggingStyles.bleedKlar}>
          <HStack className={deltakerStyles.bleedInnhold}>
            <VStack>
              <BodyShort size="medium">Del {statusDelnummer}</BodyShort>
              <BodyShort size="large">
                {finskrivKategori(status.kategori)}
              </BodyShort>
            </VStack>
          </HStack>
        </Box>
      </Bleed>
    )
  );
}
