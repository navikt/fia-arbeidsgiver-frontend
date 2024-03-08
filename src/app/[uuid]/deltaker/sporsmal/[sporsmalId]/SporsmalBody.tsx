"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Spørsmålsseksjon from "./Sporsmalsseksjon";
import CookieHandler from "@/utils/CookieHandler";
import { SpørsmålBleedDeltaker } from "@/app/[uuid]/deltaker/sporsmal/[sporsmalId]/SpørsmålBleedDeltaker";

export default function SpørsmålBody({
  spørreundersøkelseId,
  spørsmålId,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
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
      />
      <Spørsmålsseksjon
        spørreundersøkelseId={spørreundersøkelseId}
        spørsmålId={spørsmålId}
        lagretSvar={lagretSvar}
      />
    </>
  );
}
