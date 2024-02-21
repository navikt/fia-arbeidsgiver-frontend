"use client";

import { Heading, Loader, Page, VStack } from "@navikt/ds-react";
import React from "react";
import { useVertSpørreundersøkelse } from "@/app/_api_hooks/useVertSpørreundersøkelse";
import { SpørsmålFooterVert } from "@/app/[uuid]/vert/[vertId]/sporsmal/SpørsmålFooterVert";
import { SpørsmålBleedVert } from "@/app/[uuid]/vert/[vertId]/sporsmal/SpørsmålBleedVert";
import { SpørsmålInnhold } from "@/app/[uuid]/vert/[vertId]/sporsmal/SpørsmålInnhold";
import { Feilside } from "@/app/_components/Feilside";

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
