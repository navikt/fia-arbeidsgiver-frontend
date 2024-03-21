"use client";

import { useRouter } from "next/navigation";
import { useTemaoversikt } from "@/app/_api_hooks/vert/useTemaoversikt";
import HeaderBleed from "@/app/_components/HeaderBleed";
import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  Heading,
  VStack,
} from "@navikt/ds-react";
import { StatusPåDeltaker } from "@/app/_components/StatusPåDeltaker/StatusPåDeltaker";
import temasideStyles from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/(introside)/temaside.module.css";
import React from "react";

export function IntrosideBody({
  spørreundersøkelseId,
  vertId,
  temaId,
  delnummer,
  introtekst,
  introtittel,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaId: string;
  delnummer: number;
  introtekst: string;
  introtittel: string;
}) {
  const router = useRouter();

  const { data: listeOverTemaer } = useTemaoversikt(
    spørreundersøkelseId,
    vertId,
  );

  if (listeOverTemaer === undefined) {
    return null;
  }

  const temaoversikt = listeOverTemaer.find(
    (temaoversikt) => temaoversikt.temaId == temaId,
  );

  return (
    temaoversikt && (
      <>
        <HeaderBleed>
          <VStack>
            <BodyShort size="medium">Del {delnummer}</BodyShort>
            <Heading size="medium">{introtittel}</Heading>
          </VStack>
          <StatusPåDeltaker
            spørreundersøkelseId={spørreundersøkelseId}
            vertId={vertId}
          />
        </HeaderBleed>
        <Infoblokk tittel={introtittel} undertittel={introtekst} />
        <Button
          variant={"secondary"}
          onClick={() =>
            router.push(
              `./${temaoversikt.temaId}/${temaoversikt.førsteSpørsmålId}`,
            )
          }
          className={temasideStyles.startknapp}
        >
          Start
        </Button>
      </>
    )
  );
}

function Infoblokk({
  tittel,
  undertittel,
}: {
  tittel: string;
  undertittel: string;
}) {
  return (
    <Box borderRadius="xlarge" padding="12" background="surface-selected">
      <Heading size="small" spacing>
        {tittel}
      </Heading>
      <BodyLong>{undertittel}</BodyLong>
    </Box>
  );
}
