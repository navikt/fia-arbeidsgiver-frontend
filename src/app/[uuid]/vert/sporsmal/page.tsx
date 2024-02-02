import type { Metadata } from "next";
import React from "react";
import SpørsmålBody from "@/app/[uuid]/vert/sporsmal/SporsmalBody";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Spørsmålsside({
                                          params,
                                      }: {
    params: { uuid: string };
}) {


  return (
      <SpørsmålBody
          undersøkelsesId={params.uuid}
          del={1}
          delnavn={"Partssamarbeid"}
      />
  );
}
