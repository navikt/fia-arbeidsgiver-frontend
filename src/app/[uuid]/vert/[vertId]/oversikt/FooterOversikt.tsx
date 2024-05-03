"use client";

import React from "react";
import { Button, HStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import kartleggingStyles from "@/app/kartlegging.module.css";

import { useRouter } from "next/navigation";
import LinkTilResultat from "@/app/_components/LinkTilResultat";

export default function FooterOversikt({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const router = useRouter();

  return (
    <PageBlock as="footer" className={kartleggingStyles.footer}>
      <HStack gap={"4"}>
        <LinkTilResultat
          skalViseKnapp
          urlTilResultatside={`./resultater`}
          gåDirekteTilResultat={false} // TODO: Ikke vis modal dersom alle tema allerede er stengt
          knappetekst={"Vis alle resultater"}
          knappeClass={kartleggingStyles.knappHvit}
          resultatType={"undersøkelsen"}
          spørreundersøkelseId={spørreundersøkelseId}
          vertId={vertId}
        />
        <Button
          variant={"secondary"}
          onClick={() => router.push("ferdig")}
          className={kartleggingStyles.knappHvitBred}
        >
          Avslutt
        </Button>
      </HStack>
    </PageBlock>
  );
}
