"use client";

import React from "react";
import startsideStyles from "./startside.module.css";
import { Heading, Loader } from "@navikt/ds-react";
import { usePathname } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

export default function Logininformasjon() {
  const lenke: string = usePathname().slice(0, -37).replace("vert", "deltaker");
  return (
    <div className={startsideStyles.logininformasjon}>
      <LinkDisplay lenke={lenke} />
    </div>
  );
}

function LinkDisplay({ lenke }: { lenke: string }) {
  const [fullLenke, setFullLenke] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setFullLenke(
        `${window.location.protocol}//${window.location.host}${lenke}`,
      );
    }
  }, [lenke]);

  if (fullLenke === "") {
    return (
      <div className={startsideStyles.linkDisplay}>
        <Loader size="3xlarge" />
      </div>
    );
  }

  return (
    <>
      <Heading level="2" size="medium">
        Skann QR-koden for å bli med i undersøkelsen
      </Heading>
      <div className={startsideStyles.linkDisplay}>
        <QRCodeSVG value={fullLenke} className={startsideStyles.qrcode} />
        <p>Eller følg denne lenken:</p>
        <a href={fullLenke}>{fullLenke}</a>
      </div>
    </>
  );
}
