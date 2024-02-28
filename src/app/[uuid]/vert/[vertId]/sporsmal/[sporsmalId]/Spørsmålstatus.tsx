import { Alert, BodyShort, HStack, Loader } from "@navikt/ds-react";
import komponenterStyles from "../../../../../_components/komponenter.module.css";
import spørsmålStyles from "./sporsmalsside.module.css";
import { PersonGroupFillIcon } from "@navikt/aksel-icons";
import React from "react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { useAntallSvar } from "@/app/_api_hooks/vert/useAntallSvar";

export function Spørsmålstatus({
  spørreundersøkelseId,
  vertId,
  spørsmålId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  spørsmålId: string;
}) {
  const {
    data: antallSvar,
    isLoading: lasterAntallSvar,
    error: feilAntallSvar,
  } = useAntallSvar({
    vertId,
    spørreundersøkelseId,
    spørsmålId,
  });

  if (feilAntallSvar) {
    return (
      <BodyShort className={komponenterStyles.deltakere}>
        <PersonGroupFillIcon />
        <Alert
          variant={"warning"}
          inline
          className={kartleggingStyles.alertWarning}
        >
          {feilAntallSvar.message}
        </Alert>
      </BodyShort>
    );
  }

  if (lasterAntallSvar) {
    return (
      <BodyShort className={komponenterStyles.deltakere}>
        <PersonGroupFillIcon />
        <Loader />
      </BodyShort>
    );
  }

  return (
    antallSvar !== undefined && (
      <HStack className={spørsmålStyles.deltakere}>
        <PersonGroupFillIcon />
        <BodyShort>
          {`${antallSvar.antallSvar} av ${antallSvar.antallDeltakere} har svart`}
        </BodyShort>
      </HStack>
    )
  );
}
