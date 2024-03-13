"use client";

import { Alert, BodyShort, HStack, Loader } from "@navikt/ds-react";
import spørsmålStyles from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/sporsmal/sporsmalsside.module.css";
import { PersonGroupFillIcon } from "@navikt/aksel-icons";
import React from "react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { useAntallDeltakere } from "@/app/_api_hooks/vert/useAntallDeltakere";

export function Deltakelsesstatus({
  spørreundersøkelseId,
  vertId,
  visAntallSvarIndeks = null,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  visAntallSvarIndeks?: number | null;
}) {
  const { data, isLoading, error } = useAntallDeltakere({
    vertId,
    spørreundersøkelseId,
  });

  if (error !== undefined && !isLoading) {
    return (
      <HStack className={spørsmålStyles.deltakere}>
        <PersonGroupFillIcon />
        <Alert
          variant={"warning"}
          inline
          className={kartleggingStyles.alertWarning}
        >
          {error.message}
        </Alert>
      </HStack>
    );
  }

  if (visAntallSvarIndeks === null) {
    return (
      <HStack className={spørsmålStyles.deltakere}>
        <PersonGroupFillIcon />
        {isLoading ? (
          <Loader />
        ) : (
          <BodyShort>{data?.antallDeltakere} Deltakere</BodyShort>
        )}
      </HStack>
    );
  }

  return (
    <HStack className={spørsmålStyles.deltakere}>
      <PersonGroupFillIcon />
      {isLoading ? (
        <Loader variant={"inverted"} />
      ) : (
        <BodyShort>
          {`${data?.antallSvar[visAntallSvarIndeks].antall} av ${data?.antallDeltakere} har svart`}
        </BodyShort>
      )}
    </HStack>
  );
}
