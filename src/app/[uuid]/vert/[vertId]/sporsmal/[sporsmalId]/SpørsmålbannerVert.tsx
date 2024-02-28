import {
  Bleed,
  BodyShort,
  Box,
  Heading,
  HStack,
  VStack,
} from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import vertStyles from "@/app/[uuid]/vert/[vertId]/sporsmal/[sporsmalId]/sporsmalsside.module.css";
import React from "react";
import { Spørsmålstatus } from "@/app/[uuid]/vert/[vertId]/sporsmal/[sporsmalId]/Spørsmålstatus";

export function SpørsmålbannerVert({
  spørreundersøkelseId,
  spørsmålId,
  vertId,
  temanummmer,
  tittel,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
  vertId: string;
  temanummmer: number;
  tittel: string;
}) {
  return (
    <Bleed marginInline="full" asChild reflectivePadding>
      <Box padding="5" className={kartleggingStyles.bleedKlar}>
        <HStack className={vertStyles.bleedInnhold}>
          <VStack>
            <BodyShort size="medium">Del {temanummmer}</BodyShort>
            <Heading size="medium">{tittel}</Heading>
          </VStack>
          <Spørsmålstatus
            vertId={vertId}
            spørreundersøkelseId={spørreundersøkelseId}
            spørsmålId={spørsmålId}
          />
        </HStack>
      </Box>
    </Bleed>
  );
}
