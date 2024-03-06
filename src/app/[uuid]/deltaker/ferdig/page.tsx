import type { Metadata } from "next";
import { Bleed, Box, Heading, HStack, Page } from "@navikt/ds-react";
import React from "react";
import kartleggingStyles from "@/app/kartlegging.module.css";

import { FerdigInnhold } from "./ferdigInnhold";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Ferdigside({ params }: { params: { uuid: string } }) {
  return (
    <Page contentBlockPadding="none">
      <Page.Block gutters width="lg">
        <Bleed marginInline="full" asChild>
          <Box padding="5" className={kartleggingStyles.bleedFerdig}>
            <HStack justify={"center"}>
              <Heading level={"2"} size={"medium"}>
                Fullført
              </Heading>
            </HStack>
          </Box>
        </Bleed>
        <FerdigInnhold uuid={params.uuid} />
      </Page.Block>
    </Page>
  );
}
