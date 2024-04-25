"use client";

import Resultatgraf from "@/app/_components/Resultatgraf/index";
import { Box } from "@navikt/ds-react";
import resultatgrafStyle from "./resultatgraf.module.css";
import { useTemaResultat } from "@/app/_api_hooks/vert/useTemaresultater";
import { TemaResultatDTO } from "@/app/_types/TemaResultatDTO";

export default function TemaGraf({
  tema,
}: {
  tema: TemaResultatDTO | undefined;
}) {
  return (
    tema && (
      <Box
        borderRadius="xlarge"
        padding="12"
        background="bg-default"
        className={resultatgrafStyle.temaboks}
      >
        {tema.spørsmålMedSvar.map((spørsmål, index) => (
          <Resultatgraf key={index} spørsmål={spørsmål} />
        ))}
      </Box>
    )
  );
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
