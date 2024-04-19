import {
  Box,
  Heading,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
} from "@navikt/ds-react";
import React from "react";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";
import spørsmålssideStyles from "./sporsmalsside.module.css";

export function SpørsmålInnhold({
  spørsmålOgSvar,
}: {
  spørsmålOgSvar: SpørsmålsoversiktDto;
}) {
  const OptionGroup = spørsmålOgSvar.flervalg ? CheckboxGroup : RadioGroup;
  const Option = spørsmålOgSvar.flervalg ? Checkbox : Radio;
  return (
    spørsmålOgSvar && (
      <Box borderRadius="xlarge" padding="12" background="surface-selected">
        <Heading level={"2"} size={"small"} spacing>
          {spørsmålOgSvar.spørsmålTekst}{" "}
          {spørsmålOgSvar.flervalg ? "(Velg ett eller flere svar)" : null}
        </Heading>
        <OptionGroup hideLegend legend={""}>
          {spørsmålOgSvar.svaralternativer.map((svaralternativ) => (
            <Option
              key={svaralternativ.svarId}
              value={svaralternativ.svarId}
              className={spørsmålssideStyles.disabletOption}
            >
              {svaralternativ.svartekst}
            </Option>
          ))}
        </OptionGroup>
      </Box>
    )
  );
}
