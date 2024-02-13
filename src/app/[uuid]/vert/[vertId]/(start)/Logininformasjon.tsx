"use client";

import React from "react";
import styles from "./startside.module.css";
import { Heading, Loader } from "@navikt/ds-react";
import { QRCodeSVG } from "qrcode.react";
import { usePathname } from "next/navigation";

export default function Logininformasjon() {
  const lenke: string = usePathname().slice(0, -37).replace("vert", "deltaker");
  return (
    <div className={styles.logininformasjon}>
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
      <div className={styles.linkDisplay}>
        <Loader size="3xlarge" />
      </div>
    );
  }

  return (
    <>
      <Heading level="2" size="medium">
        Skann QR-koden for å bli med i undersøkelsen
      </Heading>
      <div className={styles.linkDisplay}>
        <QRCodeSVG value={fullLenke} className={styles.qrcode} />
        <p>Eller følg denne lenken:</p>
        <a href={fullLenke}>{fullLenke}</a>
      </div>
    </>
  );
}
