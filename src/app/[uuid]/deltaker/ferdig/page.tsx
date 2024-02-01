import type { Metadata } from "next";
import { Bleed, Box, Heading, HStack, Page } from "@navikt/ds-react";
import React from "react";
import styles from "./ferdig.module.css";
import { FerdigInnhold } from "./ferdigInnhold";
import Kartleggingsmøtetittel from "../Kartleggingsmøtetittel";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Ferdigside() {
  return (
    <Page contentBlockPadding="none">
      <Page.Block gutters width="lg">
        <Kartleggingsmøtetittel />
        <Bleed marginInline="full" asChild>
          <Box padding="5" className={styles.bleedFerdig}>
            <HStack justify={"center"}>
              <Heading level={"2"} size={"medium"}>
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
