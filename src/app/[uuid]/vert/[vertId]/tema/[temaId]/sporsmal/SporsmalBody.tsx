"use client";

import { Heading, Loader, Page, VStack } from "@navikt/ds-react";
import React from "react";
import { SpørsmålFooterVert } from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/sporsmal/SpørsmålFooterVert";
import { SpørsmålBleedVert } from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/sporsmal/SpørsmålBleedVert";
import { SpørsmålInnhold } from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/sporsmal/SpørsmålInnhold";
import { Feilside } from "@/app/_components/Feilside";
import { useVertSpørreundersøkelse } from "@/app/_api_hooks/vert/useVertSpørreundersøkelse";

export default function SpørsmålBody({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const {
    data: spørreundersøkelse,
    isLoading: lasterSpørreundersøkelse,
    error: feilSpørreundersøkelse,
  } = useVertSpørreundersøkelse(spørreundersøkelseId, vertId);

  const [aktivtSpørsmålindex, setAktivtSpørsmålindex] = React.useState(0);

  if (lasterSpørreundersøkelse) {
    return (
      <Page contentBlockPadding="none">
        <Page.Block as={"main"}>
          <SpørsmålBleedVert
            aktivtSpørsmålindex={aktivtSpørsmålindex}
            antallSpørsmål={10000} //TODO: Fix
            vertId={vertId}
            spørreundersøkelseId={spørreundersøkelseId}
          />
          <VStack gap={"4"} align={"center"}>
            <Heading size={"large"}>Laster spørreundersøkelse</Heading>
            <Loader size="3xlarge" title="Venter..." />
          </VStack>
        </Page.Block>
      </Page>
    );
  }

  if (feilSpørreundersøkelse) {
    return (
      <Page contentBlockPadding="none">
        <Feilside feiltekst={feilSpørreundersøkelse.message} />
      </Page>
    );
  }

  return (
    spørreundersøkelse && (
      <Page
        contentBlockPadding="none"
        footer={
          <SpørsmålFooterVert
            aktivtSpørsmålindex={aktivtSpørsmålindex}
            erViPåSisteSpørsmål={
              aktivtSpørsmålindex >= spørreundersøkelse.length - 1
            }
            setAktivtSpørsmålindex={setAktivtSpørsmålindex}
          />
        }
      >
        <Page.Block as={"main"}>
          <SpørsmålBleedVert
            aktivtSpørsmålindex={aktivtSpørsmålindex}
            antallSpørsmål={spørreundersøkelse.length}
            vertId={vertId}
            spørreundersøkelseId={spørreundersøkelseId}
          />
          <SpørsmålInnhold
            spørsmålDto={spørreundersøkelse[aktivtSpørsmålindex]}
          />
        </Page.Block>
      </Page>
    )
  );
}
