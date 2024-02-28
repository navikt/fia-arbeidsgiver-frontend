import { BodyShort, Heading, VStack } from "@navikt/ds-react";
import vertStyles from "@/app/[uuid]/vert/[vertId]/sporsmal/[sporsmalId]/sporsmalsside.module.css";
import React from "react";
import { SpørsmålDTO } from "@/app/_types/SpørsmålDTO";

export function SpørsmålInnhold({ spørsmålDto }: { spørsmålDto: SpørsmålDTO }) {
  return (
    <VStack gap="4" className={vertStyles.spørsmålInnhold}>
      <Heading level={"2"} size={"small"} spacing>
        {spørsmålDto.spørsmåltekst}
      </Heading>
      {spørsmålDto.svaralternativer &&
        spørsmålDto.svaralternativer.map((svaralternativ) => (
          <BodyShort
            key={svaralternativ.svarId}
            size={"large"}
            spacing
            className={vertStyles.innholdSvar}
          >
            {svaralternativ.svartekst}
          </BodyShort>
        ))}
    </VStack>
  );
}
