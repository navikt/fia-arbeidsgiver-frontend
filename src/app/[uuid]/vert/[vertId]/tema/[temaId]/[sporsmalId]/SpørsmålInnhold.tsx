import { BodyShort, Box, Heading } from "@navikt/ds-react";
import vertStyles from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/[sporsmalId]/sporsmalsside.module.css";
import React from "react";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";

export function SpørsmålInnhold({
  spørsmålOgSvar,
}: {
  spørsmålOgSvar: SpørsmålsoversiktDto;
}) {
  return (
    spørsmålOgSvar && (
      <Box borderRadius="xlarge" padding="12" background="surface-selected">
        <Heading level={"2"} size={"small"} spacing>
          {spørsmålOgSvar.spørsmålTekst}
        </Heading>
        {spørsmålOgSvar.svaralternativer.map((svaralternativ) => (
          <BodyShort
            key={svaralternativ.svarId}
            size={"large"}
            spacing
            className={vertStyles.innholdSvar}
          >
            {svaralternativ.svartekst}
          </BodyShort>
        ))}
      </Box>
    )
  );
}
