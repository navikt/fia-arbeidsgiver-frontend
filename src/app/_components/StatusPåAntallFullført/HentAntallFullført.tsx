"use client";

import { useAntallFullført } from "@/app/_api_hooks/vert/useAntallFullført";
import { Alert, Loader } from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import React from "react";

export function HentAntallFullført({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const {
    data: antallFullfort,
    isLoading: lasterAntallFullfort,
    error: feilAntallFullfort,
  } = useAntallFullført({
    spørreundersøkelseId,
    vertId,
  });

  if (feilAntallFullfort !== undefined) {
    return (
      <Alert
        variant={"warning"}
        inline
        className={kartleggingStyles.alertWarning}
      >
        {feilAntallFullfort.message}
      </Alert>
    );
  }

  if (lasterAntallFullfort) {
    return <Loader />;
  }

  return <>{antallFullfort}</>;
}
