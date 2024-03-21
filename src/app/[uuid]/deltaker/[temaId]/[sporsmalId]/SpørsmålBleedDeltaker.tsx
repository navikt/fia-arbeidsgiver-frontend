"use client";

import { Bleed, Box, Heading, HStack } from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import deltakerStyles from "@/app/[uuid]/deltaker/[temaId]/[sporsmalId]/sporsmalsside.module.css";
import React from "react";

export function SpørsmålBleedDeltaker({ overskrift }: { overskrift: string }) {
  return (
    <Bleed marginInline="full" asChild reflectivePadding>
      <Box padding="5" className={kartleggingStyles.bleedKlar}>
        <HStack className={deltakerStyles.bleedInnhold}>
          <Heading size="small">{overskrift}</Heading>
        </HStack>
      </Box>
    </Bleed>
  );
}
