"use client";
import loginModalStyles from "./loginmodal.module.css";
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
        className={loginModalStyles.qrcode}
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
