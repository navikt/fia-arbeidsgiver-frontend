"use client";

import { BodyShort } from "@navikt/ds-react";
import React from "react";
import CookieHandler from "@/utils/CookieHandler";
import ferdigsideStyles from "./ferdigside.module.css";

export function FerdigInnhold() {
  React.useEffect(() => {
    CookieHandler.setHarSvartAlleSpørsmål();
  });

  return (
    <>
      <BodyShort align="center" className={ferdigsideStyles.sidetekst}>
        Takk for din deltakelse 🎉
      </BodyShort>
      <BodyShort align="center" className={ferdigsideStyles.sidetekst}>
        Du kan nå lukke denne siden.
      </BodyShort>
    </>
  );
}
