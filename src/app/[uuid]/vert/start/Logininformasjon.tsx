"use client";

import React from "react";
import styles from "./startside.module.css";
import { Heading } from "@navikt/ds-react";
import { QRCodeSVG } from "qrcode.react";
import { usePathname } from "next/navigation";

export default function Logininformasjon() {
  const lenke: string = usePathname().replace("vert/start", "deltaker/landing");
  const kode = "12345";
  return (
    <div className={styles.logininformasjon}>
      <Heading level="2" size="medium">
        Følg qr-koden:
      </Heading>
      <LinkDisplay lenke={lenke} />
      <Heading level="2" size="medium">
        Skriv så inn inn følgende kode:
      </Heading>
      <PinDisplay kode={kode} />
    </div>
  );
}

function LinkDisplay({ lenke }: { lenke: string }) {
  return (
    <div className={styles.linkDisplay}>
      <QRCodeSVG value={lenke} />
      <p>
        <b>Eller</b> følg denne lenken:
      </p>
      <a href={lenke}>{lenke}</a>
    </div>
  );
}

function PinDisplay({
  kode,
  maxLength = 5,
}: {
  kode: string;
  maxLength?: number;
}) {
  const splittetKode = kode.split("").slice(0, maxLength);

  return (
    <div className={styles.pinDisplay}>
      {splittetKode.map((siffer) => (
        <Siffer key={siffer} siffer={siffer} />
      ))}
    </div>
  );
}

function Siffer({ siffer }: { siffer: string }) {
  return <div className={styles.siffer}>{siffer}</div>;
}
