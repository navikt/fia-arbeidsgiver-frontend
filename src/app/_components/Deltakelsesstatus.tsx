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
  const {
    data: antallDeltakere,
    isLoading: lasterAntallDeltakere,
    error: feilAntallDeltakere,
  } = useAntallDeltakere({
    vertId,
    spørreundersøkelseId,
  });

  if (feilAntallDeltakere !== undefined && !lasterAntallDeltakere) {
    return (
      <HStack className={spørsmålStyles.deltakere}>
        <PersonGroupFillIcon />
        <Alert
          variant={"warning"}
          inline
          className={kartleggingStyles.alertWarning}
        >
          {feilAntallDeltakere.message}
        </Alert>
      </HStack>
    );
  }

  if (visAntallSvarIndeks === null) {
    return (
      <HStack className={spørsmålStyles.deltakere}>
        <PersonGroupFillIcon />
        {lasterAntallDeltakere ? (
          <Loader />
        ) : (
          <BodyShort>{antallDeltakere} Deltakere</BodyShort>
        )}
      </HStack>
    );
  }

  return (
    <HStack className={spørsmålStyles.deltakere}>
      <PersonGroupFillIcon />
      {lasterAntallDeltakere ? (
        <Loader variant={"inverted"} />
      ) : (
        <BodyShort>
          {/*todo ${data?.antallSvar[visAntallSvarIndeks].antall} */}
          {`TODO av ${antallDeltakere} har svart`}
        </BodyShort>
      )}
    </HStack>
  );
}
