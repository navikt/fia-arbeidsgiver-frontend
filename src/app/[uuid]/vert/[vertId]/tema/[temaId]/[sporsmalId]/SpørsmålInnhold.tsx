import { Box, Heading, Radio, RadioGroup } from "@navikt/ds-react";
import React from "react";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";
import spørsmålssideStyles from "./sporsmalsside.module.css";

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
        <RadioGroup hideLegend legend={""}>
          {spørsmålOgSvar.svaralternativer.map((svaralternativ) => (
            <Radio
              key={svaralternativ.svarId}
              value={svaralternativ.svarId}
              className={spørsmålssideStyles.disabletRadio}
            >
              {svaralternativ.svartekst}
            </Radio>
          ))}
        </RadioGroup>
      </Box>
    )
  );
}
