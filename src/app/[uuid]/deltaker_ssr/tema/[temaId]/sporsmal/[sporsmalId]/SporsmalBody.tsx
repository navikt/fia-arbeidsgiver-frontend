import React from "react";

import Spørsmålsseksjon from "./Sporsmalsseksjon";
import { SpørsmålHeadingDeltaker } from "./SpørsmålHeadingDeltaker";
import { DeltakerSpørsmålDto } from "@/app/_types/DeltakerSpørsmålDto";

export default function SpørsmålBody({
  spørreundersøkelseId,
  spørsmålId,
  temaId,
  deltakerSpørsmål,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
  temaId: string;
  deltakerSpørsmål: DeltakerSpørsmålDto;
}) {
  return (
    <>
      <SpørsmålHeadingDeltaker deltakerSpørsmål={deltakerSpørsmål} />
      <Spørsmålsseksjon
        spørreundersøkelseId={spørreundersøkelseId}
        temaId={temaId}
        spørsmålId={spørsmålId}
        deltakerSpørsmål={deltakerSpørsmål}
      />
    </>
  );
}
