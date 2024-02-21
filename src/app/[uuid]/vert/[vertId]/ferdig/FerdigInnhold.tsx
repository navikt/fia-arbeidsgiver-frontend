"use client";

import { Bleed, BodyShort, Box, Heading, Page, VStack } from "@navikt/ds-react";
import ferdigStyles from "./ferdigside.module.css";
import kartleggingStyles from "@/app/kartlegging.module.css";
import React from "react";
import CookieHandler from "@/utils/CookieHandler";

export default function FerdigInnhold() {
  React.useEffect(() => {
    //Clear cookies når vi laster siden.
    CookieHandler.clear();
  });

  return (
    <Page contentBlockPadding="none">
      <Page.Block as={"main"}>
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
      </Page.Block>
    </Page>
  );
}
