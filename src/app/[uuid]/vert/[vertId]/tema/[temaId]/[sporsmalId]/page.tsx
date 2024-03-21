import type { Metadata } from "next";
import React from "react";
import SpørsmålBody from "./SporsmalBody";
import { paramTilTema } from "@/utils/spørreundersøkelsesUtils";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Spørsmålsside({
  params,
}: {
  params: { uuid: string; vertId: string; temaId: string; sporsmalId: string };
}) {
  const spørsmålnummer = 42;
  const antallspørsmål = 42;
  const delnummer = 42;
  return (
    <SpørsmålBody
      spørreundersøkelseId={params.uuid}
      vertId={params.vertId}
      tema={paramTilTema(params.temaId)}
      spørsmålId={params.sporsmalId}
      delnummer={delnummer}
      spørsmålnummer={spørsmålnummer}
      antallspørsmål={antallspørsmål}
    />
  );
}
