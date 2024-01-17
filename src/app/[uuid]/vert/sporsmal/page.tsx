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
import HeaderVert from "@/app/_components/HeaderVert";
import FooterSporsmal from "@/app/[uuid]/vert/sporsmal/FooterSporsmal";
import SporsmalUtenSvar from "@/app/[uuid]/vert/sporsmal/SporsmalUtenSvar";
import {
  dummySpørsmål,
  partssamarbeid,
  sykefraværsarbeid,
} from "@/utils/dummydata";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Spørsmålsside() {
  const deltakere = 6;
  const minPerSpørsmål = 2;
  const kartlegginger = [partssamarbeid, sykefraværsarbeid, dummySpørsmål];
  const dummyIndex = 2;

  return (
    <Page contentBlockPadding="none" footer={<FooterSporsmal />}>
      <HeaderVert deltakere={deltakere} />
      <Page.Block as={"main"}>
        <Bleed marginInline="full" asChild>
          <Box padding="5" className={styles.bleedSpørsmål}>
            <HStack className={styles.bleedInnhold}>
              <VStack>
                <BodyShort size="medium">Del {dummyIndex + 1}</BodyShort>
                <BodyShort size="large">
                  {kartlegginger[dummyIndex].hensikt}
                </BodyShort>
              </VStack>
              <HStack gap={"4"}>
                <Detail>
                  {kartlegginger[dummyIndex].spørsmål.length} punkter
                </Detail>
                <Detail>
                  Beregnet tid:{" "}
                  {minPerSpørsmål * kartlegginger[dummyIndex].spørsmål.length}{" "}
                  min
                </Detail>
              </HStack>
            </HStack>
          </Box>
        </Bleed>
        <SporsmalUtenSvar kartleggingskategori={kartlegginger[dummyIndex]} />
      </Page.Block>
    </Page>
  );
}
