"use client";

import { Alert, BodyShort, Heading, Loader, VStack } from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { Deltakelsesstatus } from "@/app/_components/Deltakelsesstatus";
import React, { useEffect } from "react";
import { inkrementerSpørsmål } from "@/app/_api_hooks/vert/inkrementerSpørsmål";
import { useVertTemastatus } from "@/app/_api_hooks/vert/useVertTemastatus";
import HeaderBleed from "@/app/_components/HeaderBleed";
import { finskrivTema } from "@/utils/spørreundersøkelsesUtils";

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
  } = useVertTemastatus(spørreundersøkelseId, vertId);

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
      <HeaderBleed>
        <Loader variant={"inverted"} size="large" title="Venter..." />
      </HeaderBleed>
    );
  }

  if (feilStatus) {
    return (
      <HeaderBleed>
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
      </HeaderBleed>
    );
  }
  return (
    status && (
      <HeaderBleed>
        <VStack>
          <BodyShort size="medium">Del {statusDelnummer}</BodyShort>
          <Heading size="medium">
            {`${finskrivTema(status.tema)} - ${
              aktivtSpørsmålindex + 1
            }/${antallSpørsmål}`}
          </Heading>
        </VStack>

        <Deltakelsesstatus
          vertId={vertId}
          spørreundersøkelseId={spørreundersøkelseId}
          visAntallSvarIndeks={aktivtSpørsmålindex}
        />
      </HeaderBleed>
    )
  );
}
