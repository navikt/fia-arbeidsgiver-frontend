"use client";

import kartleggingStyles from "@/app/kartlegging.module.css";
import { useRouter } from "next/navigation";
import HeaderBleed from "@/app/_components/HeaderBleed";
import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  Heading,
  HStack,
  VStack,
} from "@navikt/ds-react";
import { StatusPåDeltaker } from "@/app/_components/StatusPåDeltaker/StatusPåDeltaker";
import React from "react";
import { useTemaoversiktOverEttTema } from "@/app/_api_hooks/vert/useTemaoversiktOverEttTema";

export function IntrosideBody({
  spørreundersøkelseId,
  vertId,
  temaId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaId: number;
}) {
  const HARDKODET_DELNUMMER = 42;

  const router = useRouter();

  const { data: temaoversikt } = useTemaoversiktOverEttTema(
    spørreundersøkelseId,
    vertId,
    temaId,
  );

  if (temaoversikt === undefined) {
    return null;
  }

  return (
    temaoversikt && (
      <>
        <HeaderBleed>
          <VStack>
            <BodyShort size="medium">Del {HARDKODET_DELNUMMER}</BodyShort>
            <Heading size="medium">{temaoversikt.beskrivelse}</Heading>
          </VStack>
          <StatusPåDeltaker
            spørreundersøkelseId={spørreundersøkelseId}
            vertId={vertId}
          />
        </HeaderBleed>
        <Infoblokk
          tittel={temaoversikt.beskrivelse}
          undertittel={temaoversikt.introtekst}
        />
        <HStack className={kartleggingStyles.buttonFooter} gap="4">
          <Button
            variant="secondary"
            className={kartleggingStyles.knappHvitBred}
            onClick={() => router.push(`../oversikt`)}
          >
            Tilbake til oversikt
          </Button>
          <Button
            onClick={() =>
              router.push(
                `./${temaoversikt.temaId}/${temaoversikt.førsteSpørsmålId}`,
              )
            }
            className={kartleggingStyles.knappBred}
          >
            Start
          </Button>
        </HStack>
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
