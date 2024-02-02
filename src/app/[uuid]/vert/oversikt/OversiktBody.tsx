"use client";

import type { Metadata } from "next";
import Dellinje from "./Dellinje";
import { Page, VStack } from "@navikt/ds-react";
import React from "react";
import FooterOversikt from "./FooterOversikt";
import HeaderVert from "@/app/_components/HeaderVert";
import { useSpørreundersøkelse } from "@/app/_api_hooks/sporsmalOgSvar";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function OversiktBody({
  undersøkelsesId,
  del,
  delnavn,
}: {
  undersøkelsesId: string;
  del: number;
  delnavn: string;
}) {
  const minPerSpørsmål = 2;
  const { data: spørreundersøkelse } = useSpørreundersøkelse(undersøkelsesId);

  return (
    spørreundersøkelse && (
      <Page contentBlockPadding="none" footer={<FooterOversikt />}>
        <HeaderVert />
        <Page.Block as={"main"}>
          <VStack gap="4">
            <Dellinje
              key={spørreundersøkelse[0].id}
              delnummer={del}
              delnavn={delnavn}
              punkter={spørreundersøkelse.length}
              tid={minPerSpørsmål * spørreundersøkelse.length}
            />
          </VStack>
        </Page.Block>
      </Page>
    )
  );
}
