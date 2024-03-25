"use client";

import { Bleed, BodyShort, Box, Heading, Page, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import ferdigStyles from "./ferdigside.module.css";
import kartleggingStyles from "@/app/kartlegging.module.css";
import React from "react";

export default function FerdigInnhold() {
  return (
    <Page contentBlockPadding="none">
      <PageBlock as={"main"}>
        <Bleed marginInline="full" asChild>
          <Box padding="5" className={kartleggingStyles.bleedFerdig}>
            <Heading size={"large"} className={ferdigStyles.bleedInnhold}>
              Ferdig!
            </Heading>
          </Box>
        </Bleed>
        <VStack gap="4">
          <VStack align={"center"}>
            <BodyShort size={"large"} spacing>
              Bra jobbet! Da har alle svar blitt logget og sendt til Fia.
              Rådgiveren sier litt om prosessen videre.
            </BodyShort>
          </VStack>
        </VStack>
      </PageBlock>
    </Page>
  );
}
