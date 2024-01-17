import type { Metadata } from "next";
import { Bleed, Box, Heading, HStack, Page } from "@navikt/ds-react";
import React from "react";
import styles from "@/app/[uuid]/vert/oversikt/oversikt.module.css";
import { FerdigInnhold } from "@/app/[uuid]/deltaker/ferdig/ferdigInnhold";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Ferdigside() {
  return (
    <Page contentBlockPadding="none">
      <Page.Block gutters width="lg">
        <Heading level="1" size="medium">
          IA kartleggingsmøte
        </Heading>
        <Bleed marginInline="full" asChild>
          <Box padding="5" className={styles.bleedFerdig}>
            <HStack className={styles.bleedInnhold}>
              <Heading level={"2"} size={"large"}>
                Fullført
              </Heading>
            </HStack>
          </Box>
        </Bleed>
        <FerdigInnhold />
      </Page.Block>
    </Page>
  );
}
