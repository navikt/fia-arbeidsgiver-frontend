import React from "react";
import type { Metadata } from "next";

import NesteBody from "./NesteBody";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Nesteside({
  params,
}: {
  params: { uuid: string; sporsmalId: string };
}) {
  return (
    <NesteBody
      spørreundersøkelseId={params.uuid}
      spørsmålId={params.sporsmalId}
    />
  );
}
