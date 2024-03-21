"use client";
import startsideStyles from "@/app/[uuid]/vert/[vertId]/(startside)/startside.module.css";
import { QRCodeSVG } from "qrcode.react";
import React from "react";

interface Props {
  spørreundersøkelseId: string;
}

export function QRkodeVisning({ spørreundersøkelseId }: Props) {
  // Hele mounted-staten er en work-around for at vi får lenke riktig i QR-koden, ved å ikke rendre server side.
  const [mounted, setMounted] = React.useState<boolean>();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return <QRkodeVisningComponent spørreundersøkelseId={spørreundersøkelseId} />;
}
export function QRkodeVisningComponent({ spørreundersøkelseId }: Props) {
  return (
    <QRCodeSVG
      value={LenkeFraId(spørreundersøkelseId)}
      className={startsideStyles.qrcode}
    />
  );
}

export function LenkeFraId(spørreundersøkelseId: string) {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.protocol}//${window.location.host}/${spørreundersøkelseId}/deltaker`;
}
