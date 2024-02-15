"use client";

import type { Metadata } from "next";
import Dellinje from "./Dellinje";
import { Page, VStack } from "@navikt/ds-react";
import React from "react";
import FooterOversikt from "./FooterOversikt";
import HeaderVert from "@/app/_components/HeaderVert";
import { useVertSpørreundersøkelse } from "@/app/_api_hooks/sporsmalOgSvar";
import { KategoriType } from "@/app/_types/sporreundersokelseDTO";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function OversiktBody({
  spørreundersøkelseId,
  vertId,
  del,
  kategori,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  del: number;
  kategori: KategoriType;
}) {
  const { data: spørreundersøkelse } = useVertSpørreundersøkelse(
    spørreundersøkelseId,
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
              spørreundersøkelseId={spørreundersøkelseId}
              vertId={vertId}
              delnummer={del}
              kategori={kategori}
            />
          </VStack>
        </Page.Block>
      </Page>
    )
  );
}
