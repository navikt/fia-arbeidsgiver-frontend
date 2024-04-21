import type { Metadata } from "next";
import React from "react";
import { TotalresultatRenderer } from "@/app/[uuid]/vert/[vertId]/resultater/TotalresultatRenderer";

export const metadata: Metadata = {
  title: "Resultat",
};

export default function Temaresultatside({
  params,
}: {
  params: { uuid: string; vertId: string };
}) {
  return (
    <TotalresultatRenderer
      spørreundersøkelseId={params.uuid}
      vertId={params.vertId}
    />
  );
}
