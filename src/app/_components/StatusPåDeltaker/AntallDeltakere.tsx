"use client";

import { Alert, Loader } from "@navikt/ds-react";
import React from "react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { useAntallDeltakere } from "@/app/_api_hooks/vert/useAntallDeltakere";

export function AntallDeltakere({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  const {
    data: antallDeltakere,
    isLoading: lasterAntallDeltakere,
    error: feilAntallDeltakere,
  } = useAntallDeltakere({
    spørreundersøkelseId,
  });

  if (feilAntallDeltakere !== undefined) {
    return (
      <Alert
        variant={"warning"}
        inline
        className={kartleggingStyles.alertWarning}
        role="alert"
        aria-live="polite"
      >
        {feilAntallDeltakere.message}
      </Alert>
    );
  }

  if (lasterAntallDeltakere) {
    return <Loader />;
  }

  return <>{antallDeltakere}</>;
}
