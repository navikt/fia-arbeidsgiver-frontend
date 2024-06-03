"use client";

import { Box } from "@navikt/ds-react";
import resultatgrafStyle from "./resultatgraf.module.css";
import { useTemaResultat } from "@/app/_api_hooks/vert/useTemaresultater";
import {
  SpørsmålMedSvarDTO,
  TemaResultatDTO,
} from "@/app/_types/TemaResultatDTO";
import { Loader } from "@navikt/ds-react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

export default function TemaGraf({
  tema,
}: {
  tema: TemaResultatDTO | undefined;
}) {
  if (tema === undefined) {
    return (
      <div className={resultatgrafStyle.loaderWrapper}>
        <Loader size="3xlarge" title="Laster tema" variant="interaction" />
      </div>
    );
  }
  return (
    <div className={resultatgrafStyle.boksContainer}>
      {tema.spørsmålMedSvar.map((spørsmål, index) => (
        <Box
          key={index}
          borderRadius="xlarge"
          padding="12"
          background="bg-default"
          className={`${resultatgrafStyle.temaboks} ${trengerEkstraBredde(tema, spørsmål, index) ? resultatgrafStyle.flervalgTemaboks : ""}`}
        >
          {spørsmål.flervalg ? (
            <PieChart key={index} spørsmål={spørsmål} />
          ) : (
            <BarChart key={index} spørsmål={spørsmål} />
          )}
        </Box>
      ))}
    </div>
  );
}

function trengerEkstraBredde(
  tema: TemaResultatDTO,
  spørsmål: SpørsmålMedSvarDTO,
  index: number,
) {
  if (spørsmål.flervalg) {
    return true;
  }
  // Tving bar-chart til å ta full row om vi ender opp men en alene.
  if (index === 0 || tema.spørsmålMedSvar[index - 1].flervalg) {
    // Hvis vi er første etter start eller flervalg (vi er på en ny linje med ikke-flervalg)

    const nesteLineBreak =
      tema.spørsmålMedSvar.findIndex(
        (spm, ind) => spm.flervalg && ind > index,
      ) || tema.spørsmålMedSvar.length;

    const antallSpørsmål = nesteLineBreak - index;

    if (antallSpørsmål % 2 === 1) {
      return true;
    }
  }

  return false;
}

export function TemaGrafMedDatahenting({
  vertId,
  temaId,
  spørreundersøkelseId,
}: {
  temaId: number;
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const { data: tema } = useTemaResultat(spørreundersøkelseId, vertId, temaId);

  return <TemaGraf tema={tema} />;
}
