import type { Metadata } from "next";
import React from "react";
import { ResultatRenderer } from "./ResultatRenderer";

export const metadata: Metadata = {
  title: "Resultat",
};

export default function Temaresultatside({
  params,
}: {
  params: { uuid: string; vertId: string; temaId: number };
}) {
  return (
    <ResultatRenderer
      temaId={params.temaId}
      vertId={params.vertId}
      spørreundersøkelseId={params.uuid}
    />
  );
}
