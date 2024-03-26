import {
  Bleed,
  BodyShort,
  Box,
  Button,
  Heading,
  HStack,
  VStack,
} from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import vertStyles from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/[sporsmalId]/sporsmalsside.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { TemaoversiktDto } from "@/app/_types/temaoversiktDto";
import { TemaStatus } from "@/app/_types/tema";

export function OversiktBleedVert({
  temaoversikt,
}: {
  temaoversikt: TemaoversiktDto;
}) {
  return (
    temaoversikt && (
      <Bleed marginInline="full" asChild reflectivePadding>
        <Box padding="5" className={kartleggingStyles.bleedKlar}>
          <HStack className={vertStyles.bleedInnhold}>
            <VStack>
              <BodyShort size="medium">Del {temaoversikt.del}</BodyShort>
              <Heading size="medium">{temaoversikt.beskrivelse}</Heading>
            </VStack>
            <HStack gap={"4"}>
              <TemaActions temaoversikt={temaoversikt} />
            </HStack>
          </HStack>
        </Box>
      </Bleed>
    )
  );
}

function TemaActions({ temaoversikt }: { temaoversikt: TemaoversiktDto }) {
  const router = useRouter();

  switch (temaoversikt.status) {
    case TemaStatus.ALLE_SPØRSMÅL_ÅPNET:
      return (
        <Button
          variant="secondary"
          onClick={() => router.push(`./tema/${temaoversikt.temaId}`)}
          className={kartleggingStyles.knappHvitBred}
        >
          Gjenoppta
        </Button>
      );
    case TemaStatus.ÅPNET:
      return (
        <Button
          variant="secondary"
          onClick={() => router.push(`./tema/${temaoversikt.temaId}`)}
          className={kartleggingStyles.knappHvitBred}
        >
          Start
        </Button>
      );

    case TemaStatus.IKKE_ÅPNET:
    default:
      return (
        <Button
          variant="secondary"
          onClick={() => router.push(`./tema/${temaoversikt.temaId}`)}
          className={kartleggingStyles.disabletBred}
          disabled
        >
          Start
        </Button>
      );
  }
}
