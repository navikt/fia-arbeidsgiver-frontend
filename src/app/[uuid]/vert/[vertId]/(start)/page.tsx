import type { Metadata } from "next";
import React from "react";
import StartsideBody from "@/app/[uuid]/vert/[vertId]/(start)/StartsideBody";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Startside({
    params
} : {
    params: { uuid: string; vertId: string };
}) {
  return (
      <StartsideBody
          spørreundersøkelseId={params.uuid}
          vertId={params.vertId}
      />
  );
}
