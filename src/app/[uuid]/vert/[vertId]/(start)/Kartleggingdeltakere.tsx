import { Alert, BodyShort, HStack, Loader } from "@navikt/ds-react";
import komponenterStyles from "../../../../_components/komponenter.module.css";

import spørsmålStyles from "@/app/[uuid]/vert/[vertId]/sporsmal/[sporsmalId]/sporsmalsside.module.css";
import { PersonGroupFillIcon } from "@navikt/aksel-icons";
import React from "react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { useKartleggingstatus } from "@/app/_api_hooks/vert/useKartleggingstatus";

export function Kartleggingdeltakere({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const {
    data: kartleggingstatus,
    isLoading: lasterKartleggingstatus,
    error: feilKartleggingstatus,
  } = useKartleggingstatus(spørreundersøkelseId, vertId);

  if (feilKartleggingstatus) {
    return (
      <BodyShort className={komponenterStyles.deltakere}>
        <PersonGroupFillIcon />
        <Alert
          variant={"warning"}
          inline
          className={kartleggingStyles.alertWarning}
        >
          {feilKartleggingstatus.message}
        </Alert>
      </BodyShort>
    );
  }

  if (lasterKartleggingstatus) {
    return (
      <BodyShort className={komponenterStyles.deltakere}>
        <PersonGroupFillIcon />
        <Loader />
      </BodyShort>
    );
  }

  return (
    kartleggingstatus !== undefined && (
      <HStack className={spørsmålStyles.deltakere}>
        <PersonGroupFillIcon />
        <BodyShort>{kartleggingstatus.antallDeltakere}</BodyShort>
      </HStack>
    )
  );
}
