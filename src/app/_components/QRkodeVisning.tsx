import startsideStyles from "@/app/[uuid]/vert/[vertId]/(start)/startside.module.css";
import { QRCodeSVG } from "qrcode.react";
import React from "react";

interface Props {
  spørreundersøkelseId: string;
}

export function QRkodeVisning({ spørreundersøkelseId }: Props) {
  return (
    <QRCodeSVG
      value={LenkeFraId(spørreundersøkelseId)}
      className={startsideStyles.qrcode}
    />
  );
}

export function LenkeFraId(spørreundersøkelseId: string) {
  return `${window.location.protocol}//${window.location.host}/${spørreundersøkelseId}/deltaker`;
}
