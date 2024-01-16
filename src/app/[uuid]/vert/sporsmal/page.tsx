import type { Metadata } from "next";
import {
  Bleed,
  BodyShort,
  Box,
  Detail,
  HStack,
  Page,
  VStack,
} from "@navikt/ds-react";
import styles from "./spørsmålsside.module.css";
import React from "react";
import Spørsmålsseksjon from "@/app/[uuid]/vert/sporsmal/Sporsmalsseksjon";
import HeaderVert from "@/app/_components/HeaderVert";
import FooterSporsmal from "@/app/[uuid]/vert/sporsmal/FooterSporsmal";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Oversiktside() {
  const deltakere = 6;
  const delnavn = "Partssamarbeid";
  const delnummer = 1;
  const tid = 10;
  const punkter = 10;
  return (
    <Page contentBlockPadding="none" footer={<FooterSporsmal />}>
      <HeaderVert deltakere={deltakere} />
      <Page.Block as={"main"}>
        <Bleed marginInline="full" asChild>
          <Box padding="5" className={styles.bleedSpørsmål}>
            <HStack className={styles.bleedInnhold}>
              <VStack>
                <BodyShort size="medium">Del {delnummer}</BodyShort>
                <BodyShort size="large">{delnavn}</BodyShort>
              </VStack>
              <HStack gap={"4"}>
                <Detail>{punkter} punkter</Detail>
                <Detail>Beregnet tid: {tid} min</Detail>
              </HStack>
            </HStack>
          </Box>
        </Bleed>
        <VStack gap="4" className={styles.spørsmålBody}>
          <Spørsmålsseksjon />
        </VStack>
      </Page.Block>
    </Page>
  );
}
