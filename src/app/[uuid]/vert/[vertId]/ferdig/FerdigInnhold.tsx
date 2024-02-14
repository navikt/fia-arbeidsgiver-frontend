"use client";

import { Bleed, BodyShort, Box, Heading, Page, VStack } from "@navikt/ds-react";
import ferdigStyles from "./ferdigside.module.css";
import styles from "../../../kartlegging.module.css";
import React from "react";
import { deleteCookie } from "cookies-next";
import { SESSION_ID_STORAGE_KEY } from "@/utils/consts";

export default function FerdigInnhold() {
  React.useEffect(() => {
    deleteCookie(SESSION_ID_STORAGE_KEY);
  });

  return (
    <Page contentBlockPadding="none">
      <Page.Block as={"main"}>
        <Bleed marginInline="full" asChild>
          <Box padding="5" className={styles.bleedFerdig}>
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
