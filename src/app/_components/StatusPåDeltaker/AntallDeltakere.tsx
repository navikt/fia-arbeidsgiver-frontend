"use client";

import { Alert, BodyShort, Loader } from "@navikt/ds-react";
import React from "react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { useAntallDeltakere } from "@/app/_api_hooks/vert/useAntallDeltakere";

export function AntallDeltakere({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const {
    data: antallDeltakere,
    isLoading: lasterAntallDeltakere,
    error: feilAntallDeltakere,
  } = useAntallDeltakere({
    vertId,
    spørreundersøkelseId,
  });

  if (feilAntallDeltakere !== undefined) {
    return (
      <Alert
        variant={"warning"}
        inline
        className={kartleggingStyles.alertWarning}
      >
        {feilAntallDeltakere.message}
      </Alert>
    );
  }

  if (lasterAntallDeltakere) {
    return <Loader />;
  }

  return <BodyShort>{antallDeltakere}</BodyShort>;
}
