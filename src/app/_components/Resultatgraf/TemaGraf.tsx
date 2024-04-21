"use client";

import Resultatgraf from "@/app/_components/Resultatgraf/index";
import { Box, Heading } from "@navikt/ds-react";
import resultatgrafStyle from "./resultatgraf.module.css";
import { useTemaResultat } from "@/app/_api_hooks/vert/useTemaresultater";

export default function TemaGraf({
  vertId,
  temaId,
  spørreundersøkelseId,
}: {
  temaId: number;
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const { data: tema } = useTemaResultat(spørreundersøkelseId, vertId, temaId);

  return (
    tema && (
      <Box
        borderRadius="xlarge"
        padding="12"
        background="surface-selected"
        className={resultatgrafStyle.temaboks}
      >
        <div className={resultatgrafStyle.temaheader}>
          <Heading level="2" size="small">
            {tema.beskrivelse}
          </Heading>
        </div>
        {tema.spørsmålMedSvar.map((spørsmål, index) => (
          <Resultatgraf key={index} spørsmål={spørsmål} />
        ))}
      </Box>
    )
  );
}
