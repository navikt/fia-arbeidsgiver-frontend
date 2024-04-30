import { useTemaAntallSvar } from "@/app/_api_hooks/vert/useTemaAntallSvar";
import { Alert, Loader } from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import React from "react";

export function HentAntallSvarForTema({
  //TODO: ta i bruk når endepunkt for antall svar for alle temaer er klart
  spørreundersøkelseId,
  vertId,
  temaId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaId: number;
}) {
  const {
    data: antallSvarForTema,
    isLoading: lasterAntallSvarForTema,
    error: feilAntallSvarForTema,
  } = useTemaAntallSvar({
    vertId,
    spørreundersøkelseId,
    temaId,
  });

  if (feilAntallSvarForTema !== undefined) {
    return (
      <Alert
        variant={"warning"}
        inline
        className={kartleggingStyles.alertWarning}
      >
        {feilAntallSvarForTema.message}
      </Alert>
    );
  }

  if (lasterAntallSvarForTema) {
    return <Loader />;
  }

  return <>{antallSvarForTema}</>;
}
