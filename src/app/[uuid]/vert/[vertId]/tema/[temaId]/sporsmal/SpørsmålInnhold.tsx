import { spørsmålDTO } from "@/app/_types/sporreundersokelseDTO";
import { BodyShort, Heading, VStack } from "@navikt/ds-react";
import vertStyles from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/sporsmal/sporsmalsside.module.css";
import React from "react";

export function SpørsmålInnhold({ spørsmålDto }: { spørsmålDto: spørsmålDTO }) {
  //TODO hent spørsmål her
  // Feilhåndtering
  return (
    <VStack gap="4" className={vertStyles.spørsmålInnhold}>
      <Heading level={"2"} size={"small"} spacing>
        {spørsmålDto.spørsmål}
      </Heading>
      {spørsmålDto.svaralternativer.map((svaralternativ) => (
        <BodyShort
          key={svaralternativ.id}
          size={"large"}
          spacing
          className={vertStyles.innholdSvar}
        >
          {svaralternativ.tekst}
        </BodyShort>
      ))}
    </VStack>
  );
}
