import type { Metadata } from "next";
import React from "react";
import { TotalresultatRenderer } from "@/app/[uuid]/vert/resultater/TotalresultatRenderer";

export const metadata: Metadata = {
  title: "Resultat",
};

export default async function Temaresultatside(
  props: {
    params: Promise<{ uuid: string }>;
  }
) {
  const params = await props.params;
  return <TotalresultatRenderer spørreundersøkelseId={params.uuid} />;
}
