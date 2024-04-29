import { Box, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import oversiktStyles from "./oversikt.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { TemaoversiktDTO, TemaStatus } from "@/app/_types/TemaoversiktDTO";
import LinkTilResultat from "@/app/_components/LinkTilResultat";
import { ArrowRightIcon } from "@navikt/aksel-icons";

export function OversiktBleedVert({
  temaoversikt,
}: {
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
          <Heading size="medium">{temaoversikt.beskrivelse}</Heading>
          <HStack gap={"4"} justify="end">
            <TemaActions temaoversikt={temaoversikt} />
          </HStack>
        </VStack>
      </Box>
    )
  );
}

function TemaActions({ temaoversikt }: { temaoversikt: TemaoversiktDTO }) {
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
          />
          <Button
            variant="primary"
            onClick={() => router.push(`./tema/${temaoversikt.temaId}`)}
            icon={<ArrowRightIcon />}
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
          icon={<ArrowRightIcon />}
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
          icon={<ArrowRightIcon />}
          iconPosition="right"
          disabled
        >
          Start
        </Button>
      );
  }
}
