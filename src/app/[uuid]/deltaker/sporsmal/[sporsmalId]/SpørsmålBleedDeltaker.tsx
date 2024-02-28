"use client";

import { Bleed, Box, Heading, HStack } from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import deltakerStyles from "@/app/[uuid]/deltaker/sporsmal/[sporsmalId]/sporsmalsside.module.css";
import React from "react";
import {
  finskrivTematittel,
  Tematittel,
} from "@/app/_types/SpørreundersøkelseStatusDTO";

export function SpørsmålBleedDeltaker({
  tematittel,
}: {
  tematittel: Tematittel;
}) {
  return (
    <Bleed marginInline="full" asChild reflectivePadding>
      <Box padding="5" className={kartleggingStyles.bleedKlar}>
        <HStack className={deltakerStyles.bleedInnhold}>
          <Heading size="small">{finskrivTematittel(tematittel)}</Heading>
        </HStack>
      </Box>
    </Bleed>
  );
}
