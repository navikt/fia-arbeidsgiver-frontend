import React from "react";
import type { Metadata } from "next";
import Spørsmålsseksjon from "./Spørsmålsseksjon";
import { Bleed, Box, Detail, Heading, Page } from "@navikt/ds-react";

import styles from "./spørsmålsside.module.css";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Spørsmålsside() {
  const del = 1;
  const delnavn = "Partssamarbeidet";
  return (
    <Page contentBlockPadding="none">
      <Page.Block gutters width="lg" className={styles.spørsmålssideblokk}>
        <Heading level="1" size="medium">
          IA kartleggingsmøte
        </Heading>
        <Bleed marginInline="24 24" asChild reflectivePadding>
          <Box background="surface-alt-3-strong" className={styles.banner}>
            <Detail>Del {del}</Detail>
            <Heading level="4" size="xsmall">
              {delnavn}
            </Heading>
          </Box>
        </Bleed>
        <Spørsmålsseksjon />
      </Page.Block>
    </Page>
  );
}
