import type { Metadata } from "next";
import React from "react";
import { Bleed, BodyShort, Box, Heading, VStack } from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import ferdigStyles from "./ferdigside.module.css";

export const metadata: Metadata = {
  title: "Fullført",
};

export default function Ferdigside() {
  return (
    <>
      <Bleed marginInline="full" asChild>
        <Box padding="5" className={kartleggingStyles.bleedFerdig}>
          <Heading size={"large"} className={ferdigStyles.bleedInnhold}>
            Fullført!
          </Heading>
        </Box>
      </Bleed>
      <VStack gap="4">
        <VStack align={"center"}>
          <BodyShort size={"large"} spacing>
            Bra jobbet!
          </BodyShort>
        </VStack>
      </VStack>
    </>
  );
}
