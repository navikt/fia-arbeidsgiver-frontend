"use client";

import type { Metadata } from "next";
import Dellinje from "./Dellinje";
import { Page, VStack } from "@navikt/ds-react";
import React from "react";
import FooterOversikt from "./FooterOversikt";
import HeaderVert from "@/app/_components/HeaderVert";
import { useVertSpørreundersøkelse } from "@/app/_api_hooks/sporsmalOgSvar";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function OversiktBody({
  undersøkelsesId,
  vertId,
  del,
  delnavn,
}: {
  undersøkelsesId: string;
  vertId: string;
  del: number;
  delnavn: string;
}) {
  const { data: spørreundersøkelse } = useVertSpørreundersøkelse(
    undersøkelsesId,
    vertId,
  );

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
            />
          </VStack>
        </Page.Block>
      </Page>
    )
  );
}
