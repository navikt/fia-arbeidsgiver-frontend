import type { Metadata } from "next";
import Dellinje from "./Dellinje";
import { Page, VStack } from "@navikt/ds-react";
import React from "react";
import FooterOversikt from "@/app/[uuid]/vert/oversikt/FooterOversikt";
import HeaderVert from "@/app/_components/HeaderVert";
import { hardkodetKartlegging } from "@/utils/dummydata";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Oversiktside() {
  const deltakere = 6;
  const minPerSpørsmål = 2;
  const kartlegging = hardkodetKartlegging;

  return (
    <Page contentBlockPadding="none">
      <HeaderVert
        deltakere={deltakere}
        møtenr={kartlegging.møtenr}
        virksomhetsnavn={kartlegging.virksomhetsnavn}
      />
      <Page.Block as={"main"}>
        <VStack gap="4">
          {kartlegging.kategori.map((item, index) => (
            <Dellinje
              key={index}
              delnummer={index + 1}
              delnavn={kartlegging.kategori[index].tiltak}
              punkter={kartlegging.kategori[index].spørsmål.length}
              tid={minPerSpørsmål * kartlegging.kategori[index].spørsmål.length}
            />
          ))}
        </VStack>
      </Page.Block>
      <FooterOversikt />
    </Page>
  );
}
