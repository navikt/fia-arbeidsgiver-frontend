import type { Metadata } from "next";
import React from "react";
import { TotalresultatRenderer } from "./TotalresultatRenderer";

export const metadata: Metadata = {
  title: "Resultat",
};

export default function Temaresultatside({
  params,
}: {
  params: { uuid: string};
}) {
  return (
    <TotalresultatRenderer
      spørreundersøkelseId={params.uuid}
    />
  );
}
