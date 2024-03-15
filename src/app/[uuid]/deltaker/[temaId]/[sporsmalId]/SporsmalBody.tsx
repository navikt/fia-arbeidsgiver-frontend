"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Spørsmålsseksjon from "./Sporsmalsseksjon";
import CookieHandler from "@/utils/CookieHandler";
import { SpørsmålBleedDeltaker } from "@/app/[uuid]/deltaker/[temaId]/[sporsmalId]/SpørsmålBleedDeltaker";
import { Tema } from "@/app/_types/temaDTO";

export default function SpørsmålBody({
  spørreundersøkelseId,
  spørsmålId,
  temaId,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
  temaId: Tema;
}) {
  const router = useRouter();

  const storedSessionID = CookieHandler.sesjonsID;

  const lagretSvar = CookieHandler.getSvarPåSpørsmål(spørsmålId);

  React.useEffect(() => {
    if (!storedSessionID) {
      router.push("../../deltaker");
    }
  });

  return (
    <>
      <SpørsmålBleedDeltaker
        spørreundersøkelseId={spørreundersøkelseId}
        spørsmålId={spørsmålId}
        temaId={temaId}
      />
      <Spørsmålsseksjon
        spørreundersøkelseId={spørreundersøkelseId}
        temaId={temaId}
        spørsmålId={spørsmålId}
        lagretSvar={lagretSvar}
      />
    </>
  );
}
