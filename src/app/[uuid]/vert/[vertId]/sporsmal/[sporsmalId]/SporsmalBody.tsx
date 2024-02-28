"use client";

import { Box, Heading, Loader, Page, VStack } from "@navikt/ds-react";
import React from "react";
import { Feilside } from "@/app/_components/Feilside";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/vert/useSpørsmålOgSvar";
import { finskrivTematittel } from "@/app/_types/SpørreundersøkelseStatusDTO";
import { SpørsmålbannerVert } from "@/app/[uuid]/vert/[vertId]/sporsmal/[sporsmalId]/SpørsmålbannerVert";
import { SpørsmålInnhold } from "@/app/[uuid]/vert/[vertId]/sporsmal/[sporsmalId]/SpørsmålInnhold";
import SpørsmålNavigasjon from "@/app/[uuid]/vert/[vertId]/sporsmal/[sporsmalId]/SpørsmålNavigasjon";
import { useNesteSpørsmål } from "@/app/_api_hooks/vert/useNesteSpørsmål";

export default function SpørsmålBody({
  spørreundersøkelseId,
  spørsmålId,
  vertId,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
  vertId: string;
}) {
  const {
    data: spørsmål,
    isLoading: lasterSpørsmål,
    error: feilSpørsmål,
  } = useSpørsmålOgSvar(spørreundersøkelseId, spørsmålId, vertId);

  const {
    data: nesteSpørsmål,
    isLoading: lasterNesteSpørsmål,
    error: feilNesteSpørsmål,
  } = useNesteSpørsmål(spørreundersøkelseId, spørsmålId, vertId);

  if (lasterSpørsmål || lasterNesteSpørsmål) {
    return (
      <Page contentBlockPadding="none">
        <Page.Block as={"main"}>
          <SpørsmålbannerVert
            spørreundersøkelseId={spørreundersøkelseId}
            spørsmålId={spørsmålId}
            vertId={vertId}
            temanummmer={1}
            tittel={`Laster`}
          />
          <VStack gap={"4"} align={"center"}>
            <Heading size={"large"}>Laster spørreundersøkelse</Heading>
            <Loader size="3xlarge" title="Venter..." />
          </VStack>
        </Page.Block>
      </Page>
    );
  }

  if (feilSpørsmål !== undefined) {
    return (
      <Page contentBlockPadding="none">
        <Feilside feiltekst={feilSpørsmål.message} />
      </Page>
    );
  }
  if (feilNesteSpørsmål !== undefined) {
    return (
      <Page contentBlockPadding="none">
        <Feilside feiltekst={feilNesteSpørsmål.message} />
      </Page>
    );
  }

  return (
    spørsmål &&
    nesteSpørsmål && (
      <Page
        contentBlockPadding="none"
        footer={
          <Box as="footer" padding="24">
            <Page.Block width="2xl">
              <SpørsmålNavigasjon
                forrigeSporsmalId={nesteSpørsmål.forrigeSporsmalId}
                nesteSpørsmålId={nesteSpørsmål.nesteSpørsmålId}
              />
            </Page.Block>
          </Box>
        }
      >
        <Page.Block as={"main"}>
          <SpørsmålbannerVert
            spørreundersøkelseId={spørreundersøkelseId}
            spørsmålId={spørsmålId}
            vertId={vertId}
            tittel={`${finskrivTematittel(spørsmål.tematittel)} - ${
              spørsmål.spørsmålNummer
            }/${spørsmål.antallSpørsmålTema}`}
            temanummmer={1}
          />
          <SpørsmålInnhold spørsmålDto={spørsmål} />
        </Page.Block>
      </Page>
    )
  );
}
