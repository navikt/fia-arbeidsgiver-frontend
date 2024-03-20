import type { Metadata } from "next";
import React from "react";
import OversiktBody from "./OversiktBody";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Oversiktside({
  params,
}: {
  params: { uuid: string; vertId: string; temaId: string };
}) {
  return (
    <OversiktBody
      spørreundersøkelseId={params.uuid}
      vertId={params.vertId}
      temaId={params.temaId}
    />
  );
}
