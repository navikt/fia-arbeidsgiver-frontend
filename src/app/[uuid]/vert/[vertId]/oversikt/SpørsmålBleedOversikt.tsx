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
import vertStyles from "@/app/[uuid]/vert/[vertId]/sporsmal/[sporsmalId]/sporsmalsside.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import {
  finskrivTematittel,
  Temastatus,
  Tematittel,
} from "@/app/_types/SpørreundersøkelseStatusDTO";
import { useNesteSpørsmål } from "@/app/_api_hooks/vert/useNesteSpørsmål";

export function SpørsmålBleedOversikt({
  spørreundersøkelseId,
  vertId,
  delnummer,
  tittel,
  status,
  gjeldendeSpørsmålnummer,
  antallSpørsmål,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  delnummer: number;
  tittel: Tematittel;
  status: Temastatus;
  gjeldendeSpørsmålnummer: number;
  antallSpørsmål: number;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const {
    data: nesteSpørsmål,
    // isLoading: lasterNesteSpørsmål,
    // error: feilNesteSpørsmål,
  } = useNesteSpørsmål(spørreundersøkelseId, "START", vertId);

  // kartleggingStatus.temaer[0].
  return (
    nesteSpørsmål && (
      <Bleed marginInline="full" asChild reflectivePadding>
        <Box padding="5" className={kartleggingStyles.bleedKlar}>
          <HStack className={vertStyles.bleedInnhold}>
            <VStack>
              <BodyShort size="medium">Del {delnummer}</BodyShort>
              <Heading size="medium">{finskrivTematittel(tittel)}</Heading>
            </VStack>
            <HStack gap={"4"}>
              <Button
                variant={"secondary"}
                onClick={() =>
                  router.push(`sporsmal/${nesteSpørsmål?.nesteSpørsmålId}`)
                }
                className={kartleggingStyles.knappHvitBred}
              >
                {status === "IKKE_PÅBEGYNT"
                  ? "Start"
                  : status === "FULLFØRT"
                    ? "Ferdig"
                    : `Fortsett på spørsmål ${gjeldendeSpørsmålnummer}/${antallSpørsmål}`}
              </Button>
            </HStack>
          </HStack>
        </Box>
      </Bleed>
    )
  );
}
