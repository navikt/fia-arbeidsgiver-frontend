import type { Metadata } from "next";
import React from "react";
import FerdigInnhold from "./FerdigInnhold";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Ferdigside({
  params,
}: {
  params: { uuid: string; vertId: string };
}) {
  return <FerdigInnhold undersøkelsesId={params.uuid} vertId={params.vertId} />;
}
