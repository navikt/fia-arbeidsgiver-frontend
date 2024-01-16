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
import { hardkodetKartlegging } from "@/utils/dummydata";
import SporsmalUtenSvar from "@/app/[uuid]/vert/sporsmal/SporsmalUtenSvar";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Spørsmålsside() {
  const deltakere = 6;
  const minPerSpørsmål = 2;
  const kartlegging = hardkodetKartlegging;
  const dummyIndex = 0;

  return (
    <Page contentBlockPadding="none" footer={<FooterSporsmal />}>
      <HeaderVert
        deltakere={deltakere}
        møtenr={kartlegging.møtenr}
        virksomhetsnavn={kartlegging.virksomhetsnavn}
      />
      <Page.Block as={"main"}>
        <Bleed marginInline="full" asChild>
          <Box padding="5" className={styles.bleedSpørsmål}>
            <HStack className={styles.bleedInnhold}>
              <VStack>
                <BodyShort size="medium">Del {dummyIndex + 1}</BodyShort>
                <BodyShort size="large">
                  {kartlegging.kategori[dummyIndex].hensikt}
                </BodyShort>
              </VStack>
              <HStack gap={"4"}>
                <Detail>
                  {kartlegging.kategori[dummyIndex].spørsmål.length} punkter
                </Detail>
                <Detail>
                  Beregnet tid:{" "}
                  {minPerSpørsmål *
                    kartlegging.kategori[dummyIndex].spørsmål.length}{" "}
                  min
                </Detail>
              </HStack>
            </HStack>
          </Box>
        </Bleed>
        <SporsmalUtenSvar kartleggingskategori={kartlegging.kategori[0]} />
      </Page.Block>
    </Page>
  );
}
