"use client";

import { Heading, Loader, Page, VStack } from "@navikt/ds-react";
import React from "react";
import { SpørsmålBleedVert } from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/[sporsmalId]/SpørsmålBleedVert";
import { SpørsmålInnhold } from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/[sporsmalId]/SpørsmålInnhold";
import { Feilside } from "@/app/_components/Feilside";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/vert/useSpørsmålOgSvar";
import SpørsmålNavigasjon from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/[sporsmalId]/SpørsmålNavigasjon";
import { Tema } from "@/app/_types/tema";

export default function SpørsmålBody({
  spørreundersøkelseId,
  tema,
  vertId,
  spørsmålId,
  delnummer,
  spørsmålnummer,
  antallspørsmål,
}: {
  spørreundersøkelseId: string;
  tema: Tema;
  vertId: string;
  spørsmålId: string;
  delnummer: number;
  spørsmålnummer: number;
  antallspørsmål: number;
}) {
  const {
    data: spørsmålOgSvar,
    isLoading: lasterSpørsmålOgSvar,
    error: feilSpørsmålOgSvar,
  } = useSpørsmålOgSvar(spørreundersøkelseId, vertId, tema, spørsmålId);

  if (lasterSpørsmålOgSvar) {
    return (
      <Page contentBlockPadding="none">
        <Page.Block as={"main"}>
          <SpørsmålBleedVert
            tema={tema}
            spørreundersøkelseId={spørreundersøkelseId}
            vertId={vertId}
            spørsmålId={spørsmålId}
            delnummer={delnummer}
            spørsmålnummer={spørsmålnummer}
            antallSpørsmål={antallspørsmål}
          />
          <VStack gap={"4"} align={"center"}>
            <Heading size={"large"}>Laster spørreundersøkelse</Heading>
            <Loader size="3xlarge" title="Venter..." />
          </VStack>
        </Page.Block>
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
        footer={<SpørsmålNavigasjon spørsmålOgSvar={spørsmålOgSvar} />}
      >
        <Page.Block as={"main"}>
          <SpørsmålBleedVert
            tema={tema}
            spørreundersøkelseId={spørreundersøkelseId}
            vertId={vertId}
            spørsmålId={spørsmålId}
            delnummer={delnummer}
            spørsmålnummer={spørsmålnummer}
            antallSpørsmål={antallspørsmål}
          />
          <SpørsmålInnhold spørsmålOgSvar={spørsmålOgSvar} />
        </Page.Block>
      </Page>
    )
  );
}
