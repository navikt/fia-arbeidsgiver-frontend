"use client";

import { Heading, Loader, Page, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import React from "react";
import { SpørsmålBleedVert } from "./SpørsmålBleedVert";
import { SpørsmålInnhold } from "./SpørsmålInnhold";
import { Feilside } from "@/app/_components/Feilside";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/vert/useSpørsmålOgSvar";
import SpørsmålNavigasjon from "./SpørsmålNavigasjon";

export default function SpørsmålBody({
  spørreundersøkelseId,
  temaId,
  vertId,
  spørsmålId,
}: {
  spørreundersøkelseId: string;
  temaId: number;
  vertId: string;
  spørsmålId: string;
}) {
  const {
    data: spørsmålOgSvar,
    isLoading: lasterSpørsmålOgSvar,
    error: feilSpørsmålOgSvar,
  } = useSpørsmålOgSvar(spørreundersøkelseId, vertId, temaId, spørsmålId);

  if (lasterSpørsmålOgSvar) {
    return (
      <Page contentBlockPadding="none">
        <PageBlock as={"main"}>
          <SpørsmålBleedVert
            temaId={temaId}
            spørreundersøkelseId={spørreundersøkelseId}
            vertId={vertId}
            spørsmålId={spørsmålId}
            spørsmålOgSvar={spørsmålOgSvar}
          />
          <VStack gap={"4"} align={"center"}>
            <Heading size={"large"}>Laster spørreundersøkelse</Heading>
            <Loader size="3xlarge" title="Venter..." />
          </VStack>
        </PageBlock>
      </Page>
    );
  }

  if (feilSpørsmålOgSvar) {
    return (
      <Page contentBlockPadding="none">
        <Feilside feiltekst={feilSpørsmålOgSvar.message} />
      </Page>
    );
  }

  return (
    spørsmålOgSvar && (
      <Page
        contentBlockPadding="none"
        footer={
          <SpørsmålNavigasjon spørsmålOgSvar={spørsmålOgSvar} temaId={temaId} />
        }
      >
        <PageBlock as={"main"}>
          <SpørsmålBleedVert
            temaId={temaId}
            spørreundersøkelseId={spørreundersøkelseId}
            vertId={vertId}
            spørsmålId={spørsmålId}
            spørsmålOgSvar={spørsmålOgSvar}
          />
          <SpørsmålInnhold spørsmålOgSvar={spørsmålOgSvar} />
        </PageBlock>
      </Page>
    )
  );
}
