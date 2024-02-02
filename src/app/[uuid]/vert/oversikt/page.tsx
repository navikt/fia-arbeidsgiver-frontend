import type { Metadata } from "next";
import Dellinje from "./Dellinje";
import { Page, VStack } from "@navikt/ds-react";
import React from "react";
import FooterOversikt from "./FooterOversikt";
import HeaderVert from "@/app/_components/HeaderVert";
import {
  dummySpørsmål,
  partssamarbeid,
  sykefraværsarbeid,
} from "@/utils/dummydata";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Oversiktside() {
  const minPerSpørsmål = 2;
  const spørreundersøkelser = [
    partssamarbeid,
    sykefraværsarbeid,
    dummySpørsmål,
  ];

  return (
    <Page contentBlockPadding="none">
      <HeaderVert />
      <Page.Block as={"main"}>
        <VStack gap="4">
          {spørreundersøkelser.map((item, index) => (
            <Dellinje
              key={index}
              delnummer={index + 1}
              delnavn={spørreundersøkelser[index].tiltak}
              punkter={spørreundersøkelser[index].spørsmål.length}
              tid={minPerSpørsmål * spørreundersøkelser[index].spørsmål.length}
            />
          ))}
        </VStack>
      </Page.Block>
      <FooterOversikt />
    </Page>
  );
}
