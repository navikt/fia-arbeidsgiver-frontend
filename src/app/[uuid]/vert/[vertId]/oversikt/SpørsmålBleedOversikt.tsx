import { useVertKategoristatus } from "@/app/_api_hooks/useVertKategoristatus";
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
import { finskrivKategori } from "@/app/_types/sporreundersokelseDTO";
import React, { useState } from "react";
import { inkrementerSpørsmål } from "@/app/_api_hooks/inkrementerSpørsmål";
import { startKategori } from "@/app/_api_hooks/startKategori";
import { useRouter } from "next/navigation";

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
  } = useVertKategoristatus(spørreundersøkelseId, vertId);

  function startKartlegging() {
    if (status === undefined || status.kategori === undefined) {
      return;
    }

    startKategori(spørreundersøkelseId, vertId, status.kategori)
      .then(() => {
        setFeilStart(null);
        inkrementerSpørsmål(spørreundersøkelseId, vertId)
          .then(() => {
            setFeilStart(null);
            router.push("sporsmal");
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
      <Bleed marginInline="full" asChild reflectivePadding>
        <Box padding="5" className={kartleggingStyles.bleedKlar}>
          <HStack justify={"center"} align={"center"}>
            <Alert variant={"error"} inline>
              {feilStatus.message}
            </Alert>
          </HStack>
        </Box>
      </Bleed>
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
                {finskrivKategori(status.kategori)}
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
                {status.status === "PÅBEGYNT" ? "Fortsett" : "Start"}
              </Button>
            </HStack>
          </HStack>
        </Box>
      </Bleed>
    )
  );
}
