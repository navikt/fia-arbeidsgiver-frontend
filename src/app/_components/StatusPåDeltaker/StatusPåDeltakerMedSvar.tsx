"use client";

import { Alert, HStack, Loader } from "@navikt/ds-react";
import statusPåDeltakereStyles from "./statusPåDeltaker.module.css";
import { PersonGroupFillIcon } from "@navikt/aksel-icons";
import React from "react";
import { useAntallSvar } from "@/app/_api_hooks/vert/useAntallSvar";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { useAntallDeltakere } from "@/app/_api_hooks/vert/useAntallDeltakere";

export function StatusPåDeltakerMedSvar({
  spørreundersøkelseId,
  vertId,
  temaId,
  spørsmålId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaId: number;
  spørsmålId: string;
}) {
  const {
    data: antallSvar,
    isLoading: lasterAntallSvar,
    error: feilAntallSvar,
  } = useAntallSvar({
    vertId,
    spørreundersøkelseId,
    temaId,
    spørsmålId,
  });
  const {
    data: antallDeltakere,
    isLoading: lasterAntallDeltakere,
    error: feilAntallDeltakere,
  } = useAntallDeltakere({
    vertId,
    spørreundersøkelseId,
  });

  if (feilAntallSvar !== undefined || feilAntallDeltakere !== undefined) {
    return (
      <Alert
        variant={"warning"}
        inline
        className={kartleggingStyles.alertWarning}
      >
        {feilAntallSvar?.message}
        {feilAntallSvar !== undefined && feilAntallDeltakere !== undefined ? (
          <br />
        ) : undefined}
        {feilAntallDeltakere?.message}
      </Alert>
    );
  }
  return (
    <HStack className={statusPåDeltakereStyles.deltakereMedStatus}>
      <PersonGroupFillIcon />
      <InnholdEllerSpinner innhold={antallSvar} laster={lasterAntallSvar} />
      {"/"}
      <InnholdEllerSpinner
        innhold={antallDeltakere}
        laster={lasterAntallDeltakere}
      />
    </HStack>
  );
}

function InnholdEllerSpinner({
  innhold,
  laster,
}: {
  innhold: React.ReactNode;
  laster: boolean;
}) {
  if (innhold === undefined || laster) {
    return <Loader variant="inverted" />;
  }
  return <>{innhold}</>;
}
