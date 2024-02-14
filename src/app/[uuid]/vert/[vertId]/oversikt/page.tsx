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
  params: { uuid: string; vertId: string };
}) {
  return (
    <OversiktBody
      del={1}
      kategori={"PARTSSAMARBEID"}
      spørreundersøkelseId={params.uuid}
      vertId={params.vertId}
    />
  );
}
