"use client";

import { BodyShort } from "@navikt/ds-react";
import React from "react";
import CookieHandler from "@/utils/CookieHandler";
import startsideStyles from "@/app/[uuid]/deltaker/(bli-med)/startside.module.css";

export function FerdigInnhold() {
  React.useEffect(() => {
    CookieHandler.setHarSvartAlleSpørsmål();
  });

  return (
    <BodyShort align="center" className={startsideStyles.sidetekst}>
      Takk for din deltakelse 🎉
    </BodyShort>
  );
}
