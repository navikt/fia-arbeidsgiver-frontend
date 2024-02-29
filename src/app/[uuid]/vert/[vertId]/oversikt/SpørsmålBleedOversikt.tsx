import {
  Alert,
  Bleed,
  BodyShort,
  Box,
  Button,
  Heading,
  HStack,
  Loader,
  VStack,
} from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import vertStyles from "@/app/[uuid]/vert/[vertId]/sporsmal/sporsmalsside.module.css";
import { finskrivTema } from "@/app/_types/sporreundersokelseDTO";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Feilside } from "@/app/_components/Feilside";
import { useVertTemastatus } from "@/app/_api_hooks/vert/useVertTemastatus";
import { startTema } from "@/app/_api_hooks/vert/startTema";
import { inkrementerSpørsmål } from "@/app/_api_hooks/vert/inkrementerSpørsmål";

export function SpørsmålBleedOversikt({
  spørreundersøkelseId,
  vertId,
  statusDelnummer,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  statusDelnummer: number;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const [feilStart, setFeilStart] = useState<string | null>(null);

  const {
    data: status,
    isLoading: lasterStatus,
    error: feilStatus,
  } = useVertTemastatus(spørreundersøkelseId, vertId);

  function startKartlegging() {
    if (status === undefined || status.tema === undefined) {
      return;
    }

    startTema(spørreundersøkelseId, vertId, status.tema)
      .then(() => {
        setFeilStart(null);
        inkrementerSpørsmål(spørreundersøkelseId, vertId)
          .then(() => {
            setFeilStart(null);
            router.push("sporsmal"); // TODO: push til spørsmål/{spørreundersøkelseId} etter refactor
          })
          .catch((error) => setFeilStart(error.message));
      })
      .catch((error) => setFeilStart(error.message));
  }

  if (lasterStatus) {
    return (
      <Bleed marginInline="full" asChild reflectivePadding>
        <Box padding="5" className={kartleggingStyles.bleedKlar}>
          <HStack justify={"center"} align={"center"}>
            <Loader variant={"inverted"} size="large" title="Venter..." />
          </HStack>
        </Box>
      </Bleed>
    );
  }

  if (feilStatus) {
    return (
      <>
        <Bleed marginInline="full" asChild reflectivePadding>
          <Box padding="5" className={kartleggingStyles.bleedKlar} />
        </Bleed>
        <Feilside feiltekst={feilStatus.message} />
      </>
    );
  }

  return (
    status && (
      <Bleed marginInline="full" asChild reflectivePadding>
        <Box padding="5" className={kartleggingStyles.bleedKlar}>
          <HStack className={vertStyles.bleedInnhold}>
            <VStack>
              <BodyShort size="medium">Del {statusDelnummer}</BodyShort>
              <Heading size="medium">
                {finskrivTema(status.tema)}
              </Heading>
            </VStack>
            <HStack gap={"4"}>
              {feilStart !== null && (
                <Alert variant={"error"} inline>
                  {feilStart}
                </Alert>
              )}
              <Button
                variant={"secondary"}
                onClick={() => startKartlegging()}
                className={kartleggingStyles.knappHvitBred}
              >
                {status.status === "PÅBEGYNT" && status.spørsmålindeks !== null
                  ? `Fortsett på spørsmål ${status.spørsmålindeks + 1}/${
                      status.antallSpørsmål
                    }`
                  : "Start"}
              </Button>
            </HStack>
          </HStack>
        </Box>
      </Bleed>
    )
  );
}
