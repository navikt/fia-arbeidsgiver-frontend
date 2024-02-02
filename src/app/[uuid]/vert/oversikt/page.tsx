import type { Metadata } from "next";
import React from "react";
import OversiktBody from "@/app/[uuid]/vert/oversikt/OversiktBody";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Oversiktside({ params }: { params: { uuid: string } }) {

  return (
    <OversiktBody
      del={1}
      delnavn={"Partssamarbeid"}
      undersøkelsesId={params.uuid}
    />
  );
}
