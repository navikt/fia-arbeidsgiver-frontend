"use client";

import { Alert, BodyShort, Loader } from "@navikt/ds-react";
import React from "react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { useAntallSvar } from "@/app/_api_hooks/vert/useAntallSvar";
import { Tema } from "@/app/_types/tema";

export function AntallSvar({
  spørreundersøkelseId,
  vertId,
  tema,
  spørsmålId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  tema: Tema;
  spørsmålId: string;
}) {
  const {
    data: antallSvar,
    isLoading: lasterAntallSvar,
    error: feilAntallSvar,
  } = useAntallSvar({
    vertId,
    spørreundersøkelseId,
    tema,
    spørsmålId,
  });

  if (feilAntallSvar !== undefined) {
    return (
      <Alert
        variant={"warning"}
        inline
        className={kartleggingStyles.alertWarning}
      >
        {feilAntallSvar.message}
      </Alert>
    );
  }

  if (lasterAntallSvar) {
    return <Loader />;
  }

  return <BodyShort>{antallSvar}</BodyShort>;
}
