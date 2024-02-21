import { Alert, BodyShort, Loader } from "@navikt/ds-react";
import komponenterStyles from "./komponenter.module.css";
import spørsmålStyles from "../[uuid]/vert/[vertId]/sporsmal/sporsmalsside.module.css";
import { PersonGroupIcon } from "@navikt/aksel-icons";
import React from "react";
import { useAntallDeltakere } from "@/app/_api_hooks/useAntallDeltakere";
import kartleggingStyles from "@/app/kartlegging.module.css";

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
      <BodyShort className={komponenterStyles.deltakere}>
        <PersonGroupIcon />

        <Alert
          variant={"warning"}
          inline
          className={kartleggingStyles.alertWarning}
        >
          {error.message}
        </Alert>
      </BodyShort>
    );
  }

  if (visAntallSvarIndeks === null) {
    return (
      <BodyShort className={komponenterStyles.deltakere}>
        <PersonGroupIcon />
        {isLoading ? <Loader /> : data?.antallDeltakere}
      </BodyShort>
    );
  }

  return (
    <BodyShort className={spørsmålStyles.deltakere}>
      <PersonGroupIcon />
      {isLoading ? (
        <Loader variant={"inverted"} />
      ) : (
        `${data?.antallSvar[visAntallSvarIndeks].antall} av ${data?.antallDeltakere} har svart`
      )}
    </BodyShort>
  );
}
