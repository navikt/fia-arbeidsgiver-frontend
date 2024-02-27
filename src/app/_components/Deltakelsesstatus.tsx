import { Alert, BodyShort, HStack, Loader } from "@navikt/ds-react";
import komponenterStyles from "./komponenter.module.css";
import spørsmålStyles from "../[uuid]/vert/[vertId]/sporsmal/sporsmalsside.module.css";
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
      <BodyShort className={komponenterStyles.deltakere}>
        <PersonGroupFillIcon />
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
        <PersonGroupFillIcon />
        {isLoading ? <Loader /> : data?.antallDeltakere}
      </BodyShort>
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
