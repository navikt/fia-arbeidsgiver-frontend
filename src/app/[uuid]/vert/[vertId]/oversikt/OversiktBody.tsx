"use client";

import type { Metadata } from "next";
import { Alert, Loader, Page, VStack } from "@navikt/ds-react";
import React from "react";
import FooterOversikt from "./FooterOversikt";
import HeaderVert from "@/app/_components/HeaderVert";
import { SpørsmålBleedOversikt } from "@/app/[uuid]/vert/[vertId]/oversikt/SpørsmålBleedOversikt";
import { useKartleggingstatus } from "@/app/_api_hooks/vert/useKartleggingstatus";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function OversiktBody({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const {
    data: kartleggingStatus,
    isLoading: lasterStatus,
    error: feilStatus,
  } = useKartleggingstatus(spørreundersøkelseId, vertId);

  if (lasterStatus) {
    return <Loader />;
  }

  if (feilStatus) {
    return <Alert variant={"error"}>{feilStatus.message}</Alert>;
  }

  return (
    kartleggingStatus !== undefined && (
      <Page contentBlockPadding="none" footer={<FooterOversikt />}>
        <HeaderVert />
        <Page.Block as={"main"}>
          <VStack gap="4">
            {kartleggingStatus.temaer.map((tema, index) => (
              <SpørsmålBleedOversikt
                key={index}
                vertId={vertId}
                delnummer={index + 1}
                spørreundersøkelseId={spørreundersøkelseId}
                tittel={tema.tittel}
                status={tema.status}
                gjeldendeSpørsmålnummer={tema.gjeldendeSpørsmålnummer}
                antallSpørsmål={tema.antallSpørsmål}
              />
            ))}
          </VStack>
        </Page.Block>
      </Page>
    )
  );
}
