import {
  Alert,
  Bleed,
  BodyShort,
  Box,
  Heading,
  HStack,
  Loader,
  VStack,
} from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import vertStyles from "@/app/[uuid]/vert/[vertId]/sporsmal/sporsmalsside.module.css";
import { Deltakelsesstatus } from "@/app/_components/Deltakelsesstatus";
import { finskrivKategori } from "@/app/_types/sporreundersokelseDTO";
import React, { useEffect } from "react";
import { inkrementerSpørsmål } from "@/app/_api_hooks/vert/inkrementerSpørsmål";
import { useVertKategoristatus } from "@/app/_api_hooks/vert/useVertKategoristatus";

export function SpørsmålBleedVert({
  spørreundersøkelseId,
  aktivtSpørsmålindex,
  vertId,
  antallSpørsmål,
}: {
  aktivtSpørsmålindex: number;
  spørreundersøkelseId: string;
  vertId: string;
  antallSpørsmål: number;
}) {
  const statusDelnummer = 1;

  const {
    data: status,
    isLoading: lasterStatus,
    error: feilStatus,
  } = useVertKategoristatus(spørreundersøkelseId, vertId);

  useEffect(() => {
    if (
      status &&
      status.spørsmålindeks !== null &&
      aktivtSpørsmålindex > status.spørsmålindeks
    ) {
      inkrementerSpørsmål(spørreundersøkelseId, vertId).catch((error) =>
        console.log(`Kunne ikke inkrementere ${error.message}`),
      );
    }
  }, [aktivtSpørsmålindex, status, spørreundersøkelseId, vertId]);

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
          <HStack className={vertStyles.bleedInnhold}>
            <VStack>
              {feilStatus && (
                <Alert
                  variant={"warning"}
                  inline
                  className={kartleggingStyles.alertWarning}
                >
                  {feilStatus.message}
                </Alert>
              )}
            </VStack>
            <Deltakelsesstatus
              vertId={vertId}
              spørreundersøkelseId={spørreundersøkelseId}
              visAntallSvarIndeks={aktivtSpørsmålindex}
            />
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
                {`${finskrivKategori(status.kategori)} - ${
                  aktivtSpørsmålindex + 1
                }/${antallSpørsmål}`}
              </Heading>
            </VStack>

            <Deltakelsesstatus
              vertId={vertId}
              spørreundersøkelseId={spørreundersøkelseId}
              visAntallSvarIndeks={aktivtSpørsmålindex}
            />
          </HStack>
        </Box>
      </Bleed>
    )
  );
}
