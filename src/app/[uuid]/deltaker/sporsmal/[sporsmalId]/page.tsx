import React from "react";
import type { Metadata } from "next";
import SpørsmålBody from "./SporsmalBody";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Spørsmålsside({
  params,
}: {
  params: { uuid: string; sporsmalId: string };
}) {
  return (
    <SpørsmålBody
      spørreundersøkelsesId={params.uuid}
      spørsmålId={params.sporsmalId}
    />
  );
}
