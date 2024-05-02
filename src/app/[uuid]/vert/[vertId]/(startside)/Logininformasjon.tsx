"use client";

import React from "react";
import startsideStyles from "./startside.module.css";
import { Heading } from "@navikt/ds-react";
import {
  lenkeFraId,
  QRkodeVisning,
} from "@/app/_components/LoginModal/QRkodeVisning";
import { HydrationSafeClientsideComponent } from "@/app/_components/HydrationSafeClientsideComponent";

export default function Logininformasjon({
  spørreundersøkelseId,
}: {
  spørreundersøkelseId: string;
}) {
  return (
    <HydrationSafeClientsideComponent>
      <div className={startsideStyles.logininformasjon}>
        <Heading level="2" size="medium">
          Skann QR-koden for å bli med i undersøkelsen
        </Heading>
        <div className={startsideStyles.linkDisplay}>
          <QRkodeVisning spørreundersøkelseId={spørreundersøkelseId} />
          <p>Eller følg denne lenken:</p>
          <a href={lenkeFraId(spørreundersøkelseId)}>
            {lenkeFraId(spørreundersøkelseId)}
          </a>
        </div>
      </div>
    </HydrationSafeClientsideComponent>
  );
}
