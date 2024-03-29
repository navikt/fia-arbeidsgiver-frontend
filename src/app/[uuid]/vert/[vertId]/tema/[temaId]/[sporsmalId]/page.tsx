import type { Metadata } from "next";
import React from "react";
import SpørsmålBody from "./SporsmalBody";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Spørsmålsside({
  params,
}: {
  params: { uuid: string; vertId: string; temaId: number; sporsmalId: string };
}) {
  return (
    <SpørsmålBody
      spørreundersøkelseId={params.uuid}
      vertId={params.vertId}
      temaId={params.temaId}
      spørsmålId={params.sporsmalId}
    />
  );
}
