"use client";

import {
  Bleed,
  BodyShort,
  Box,
  Button,
  Heading,
  Page,
  VStack,
} from "@navikt/ds-react";
import ferdigStyles from "./ferdigside.module.css";
import styles from "../../../kartlegging.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { SESSION_ID_STORAGE_KEY } from "@/utils/consts";

export default function FerdigInnhold() {
  const router = useRouter();
  React.useEffect(() => {
    deleteCookie(SESSION_ID_STORAGE_KEY);
  });

  return (
    <Page
      contentBlockPadding="none"
      footer={
        <Box as="footer" padding="8">
          <Page.Block gutters width="2xl" className={styles.footer}>
            <Button
              variant="secondary"
              className={styles.knappHvitBred}
              onClick={() => router.push("../../../")}
            >
              Lukk kartlegging
            </Button>
          </Page.Block>
        </Box>
      }
    >
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
