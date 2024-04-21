import {
  BodyShort,
  Box,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
} from "@navikt/ds-react";
import React from "react";
import { SpørsmåloversiktDTO } from "@/app/_types/SpørsmåloversiktDTO";
import spørsmålssideStyles from "./sporsmalsside.module.css";

export function SpørsmålInnhold({
  spørsmålOgSvar,
}: {
  spørsmålOgSvar: SpørsmåloversiktDTO;
}) {
  const OptionGroup = spørsmålOgSvar.flervalg ? CheckboxGroup : RadioGroup;
  const Option = spørsmålOgSvar.flervalg ? Checkbox : Radio;
  return (
    spørsmålOgSvar && (
      <Box borderRadius="xlarge" padding="12" background="surface-selected">
        <BodyShort weight={"semibold"}>
          {spørsmålOgSvar.spørsmålTekst}{" "}
          {spørsmålOgSvar.flervalg ? (
            <BodyShort>(flere valg er mulig)</BodyShort>
          ) : null}
        </BodyShort>
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
