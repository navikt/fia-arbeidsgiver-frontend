import type { Metadata } from "next";
import React from "react";
import { dummySpørsmålMedSvarPerTema } from "../dummyData";
import { ResultatRenderer } from "./ResultatRenderer";

export const metadata: Metadata = {
  title: "Resultat",
};

export default function Temaresultatside({
  params,
}: {
  params: { uuid: string; vertId: string; temaId: number };
}) {
  const dummySpmOgSvarForTema = dummySpørsmålMedSvarPerTema[0];
  return (
    <ResultatRenderer
      tema={dummySpmOgSvarForTema}
      vertId={params.vertId}
      spørreundersøkelseId={params.uuid}
    />
  );
}
