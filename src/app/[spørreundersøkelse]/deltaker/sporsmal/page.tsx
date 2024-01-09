import React from "react";
import type { Metadata } from "next";
import Spørsmålsseksjon from "./Spørsmålsseksjon";
import { Bleed, Box, Heading, Page } from "@navikt/ds-react";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Spørsmålsside() {
  const del = 1;
  const delnavn = "Partssamarbeid";
  return (
    <Page>
      <Page.Block gutters width="lg">
        <Heading size="medium">IA kartleggingsmøte</Heading>
        <Bleed>
          <Box background="surface-alt-3-strong">
            <Heading size="small">Del {del}</Heading>
            <Heading size="small">{delnavn}</Heading>
          </Box>
        </Bleed>
        <Spørsmålsseksjon />
      </Page.Block>
    </Page>
  );
}
