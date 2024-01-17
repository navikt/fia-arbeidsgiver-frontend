import type { Metadata } from "next";
import { Bleed, Box, Heading, HStack, Page } from "@navikt/ds-react";
import React from "react";
import deltakerStyles from "../deltaker.module.css";
import { FerdigInnhold } from "./ferdigInnhold";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Ferdigside() {
  return (
    <Page contentBlockPadding="none">
      <Page.Block gutters width="lg">
        <Heading level="1" size="large">
          IA kartleggingsmøte
        </Heading>
        <Bleed marginInline="full" asChild>
          <Box padding="5" className={deltakerStyles.bleedFerdig}>
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
