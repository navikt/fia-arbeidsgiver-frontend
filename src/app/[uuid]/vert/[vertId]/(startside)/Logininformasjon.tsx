"use client";

import React from "react";
import startsideStyles from "./startside.module.css";
import { Heading } from "@navikt/ds-react";
import { LenkeFraId, QRkodeVisning } from "@/app/_components/QRkodeVisning";

export default function Logininformasjon({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  return (
    <div className={startsideStyles.logininformasjon}>
      <Heading level="2" size="medium">
        Skann QR-koden for å bli med i undersøkelsen
      </Heading>
      <div className={startsideStyles.linkDisplay}>
        <QRkodeVisning spørreundersøkelseId={spørreundersøkelseId} />
        <p>Eller følg denne lenken:</p>
        <a href={LenkeFraId(spørreundersøkelseId)}>
          {LenkeFraId(spørreundersøkelseId)}
        </a>
      </div>
    </div>
  );
}
