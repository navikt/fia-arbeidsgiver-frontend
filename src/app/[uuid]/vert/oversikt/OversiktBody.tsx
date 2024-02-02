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

  if (!spørreundersøkelse) return <div>Mangler spørreundersøkelse</div>;

  const spørreundersøkelser = [spørreundersøkelse];
  return (
    <Page contentBlockPadding="none" footer={<FooterOversikt />}>
      <HeaderVert />
      <Page.Block as={"main"}>
        <VStack gap="4">
          {spørreundersøkelser.map((item) => (
            <Dellinje
              key={item[0].id}
              delnummer={del}
              delnavn={delnavn}
              punkter={item.length}
              tid={minPerSpørsmål * item.length}
            />
          ))}
        </VStack>
      </Page.Block>
    </Page>
  );
}
