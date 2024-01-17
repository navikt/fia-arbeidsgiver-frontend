import type { Metadata } from "next";
import { Bleed, BodyShort, Box, HStack, Page, VStack } from "@navikt/ds-react";
import spørsmålStyles from "./spørsmålsside.module.css";
import vertStyles from "../vert.module.css";
import React from "react";
import HeaderVert from "@/app/_components/HeaderVert";
import FooterSporsmal from "./FooterSporsmal";
import SporsmalUtenSvar from "./SporsmalUtenSvar";
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
  const kartlegginger = [partssamarbeid, sykefraværsarbeid, dummySpørsmål];
  const dummyIndex = 2;
  const deltakere = 6;

  return (
    <Page contentBlockPadding="none" footer={<FooterSporsmal />}>
      <HeaderVert deltakere={deltakere} />
      <Page.Block as={"main"}>
        <Bleed marginInline="full" asChild>
          <Box padding="5" className={vertStyles.bleedKlar}>
            <HStack className={spørsmålStyles.bleedInnhold}>
              <VStack>
                <BodyShort size="medium">Del {dummyIndex + 1}</BodyShort>
                <BodyShort size="large">
                  {kartlegginger[dummyIndex].hensikt}
                </BodyShort>
              </VStack>
            </HStack>
          </Box>
        </Bleed>
        <SporsmalUtenSvar kartleggingskategori={kartlegginger[dummyIndex]} />
      </Page.Block>
    </Page>
  );
}
