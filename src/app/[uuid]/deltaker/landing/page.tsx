import type { Metadata } from "next";
import { BodyShort, Heading, Page, VStack } from "@navikt/ds-react";
import React from "react";
import LandingssideBody from "@/app/[uuid]/deltaker/landing/landingssideBody";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Landingsside() {
  return (
    <Page contentBlockPadding="none">
      <Page.Block gutters width="lg">
        <VStack gap={"4"}>
          <Heading level="1" size="medium">
            IA kartleggingsmøte
          </Heading>
          <BodyShort>Skriv in koden du ser på rådgivers skjerm</BodyShort>
          <LandingssideBody />
        </VStack>
      </Page.Block>
    </Page>
  );
}
