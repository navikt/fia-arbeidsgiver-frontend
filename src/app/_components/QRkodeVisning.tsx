"use client";
import startsideStyles from "@/app/[uuid]/vert/[vertId]/(startside)/startside.module.css";
import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { HydrationSafeClientsideComponent } from "@/app/_components/HydrationSafeClientsideComponent";

interface Props {
  spørreundersøkelseId: string;
}

export function QRkodeVisning({ spørreundersøkelseId }: Props) {
  return (
    <HydrationSafeClientsideComponent>
      <QRCodeSVG
        value={lenkeFraId(spørreundersøkelseId)}
        className={startsideStyles.qrcode}
      />
    </HydrationSafeClientsideComponent>
  );
}
export function lenkeFraId(spørreundersøkelseId: string) {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.protocol}//${window.location.host}/${spørreundersøkelseId}/deltaker`;
}
