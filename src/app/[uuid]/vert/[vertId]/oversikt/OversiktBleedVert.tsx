import { Box, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import oversiktStyles from "./oversikt.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { TemaoversiktDTO, TemaStatus } from "@/app/_types/TemaoversiktDTO";
import LinkTilResultat from "@/app/_components/LinkTilResultat";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { StatusPåDeltakerMedSvar } from "@/app/_components/StatusPåDeltaker/StatusPåDeltakerMedSvar";

export function OversiktBleedVert({
  spørreundersøkelseId,
  vertId,
  temaoversikt,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaoversikt: TemaoversiktDTO;
}) {
  return (
    temaoversikt && (
      <Box padding="10" className={oversiktStyles.temaboks}>
        <VStack
          gap="8"
          justify="space-between"
          className={oversiktStyles.temaboksinnhold}
        >
          <VStack gap="4">
            <StatusPåDeltakerMedSvar
              spørreundersøkelseId={spørreundersøkelseId}
              vertId={vertId}
              temaId={temaoversikt.temaId}
              erSynlig={temaoversikt.status !== "IKKE_ÅPNET"}
            />
            <Heading size="medium">{temaoversikt.beskrivelse}</Heading>
          </VStack>
          <HStack gap={"4"} justify={"end"}>
            <TemaActions
              temaoversikt={temaoversikt}
              spørreundersøkelseId={spørreundersøkelseId}
              vertId={vertId}
            />
          </HStack>
        </VStack>
      </Box>
    )
  );
}

function TemaActions({
  temaoversikt,
  spørreundersøkelseId,
  vertId,
}: {
  temaoversikt: TemaoversiktDTO;
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const router = useRouter();

  switch (temaoversikt.status) {
    case TemaStatus.ALLE_SPØRSMÅL_ÅPNET:
      return (
        <>
          <LinkTilResultat
            skalViseKnapp
            urlTilResultatside={`./resultater/${temaoversikt.temaId}`}
            gåDirekteTilResultat={false} // TODO: Ikke via modal dersom tema allerede er stengt
            knappetekst={""}
            variant="primary"
            spørreundersøkelseId={spørreundersøkelseId}
            vertId={vertId}
            temaId={temaoversikt.temaId}
          />
          <Button
            variant="primary"
            onClick={() => router.push(`./tema/${temaoversikt.temaId}`)}
            icon={<ArrowRightIcon aria-hidden />}
            iconPosition="right"
          >
            Gjenoppta
          </Button>
        </>
      );
    case TemaStatus.ÅPNET:
      return (
        <Button
          variant="primary"
          onClick={() => router.push(`./tema/${temaoversikt.temaId}`)}
          icon={<ArrowRightIcon aria-hidden />}
          iconPosition="right"
        >
          Start
        </Button>
      );

    case TemaStatus.IKKE_ÅPNET:
    default:
      return (
        <Button
          variant="primary"
          onClick={() => router.push(`./tema/${temaoversikt.temaId}`)}
          icon={<ArrowRightIcon aria-hidden />}
          iconPosition="right"
          disabled
        >
          Start
        </Button>
      );
  }
}
