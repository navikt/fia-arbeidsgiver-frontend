import React from "react";
import { Button, VStack } from "@navikt/ds-react";

import styles from "./sporsmalsside.module.css";
import { spørsmålDTO } from "@/app/_types/sporreundersokelseDTO";

export function Spørsmål({
  spørsmål,
  velgSvar,
  valgtSvar,
}: {
  spørsmål: spørsmålDTO;
  velgSvar: (spørsmålId: string, svaralternativId: string) => void;
  valgtSvar?: string;
}) {
  return (
    <VStack align="center">
      {spørsmål.svaralternativer.map((svaralternativ) => (
        <Button
          key={svaralternativ.id}
          variant={valgtSvar === svaralternativ.id ? "primary" : "secondary"}
          id={svaralternativ.id}
          onClick={() => velgSvar(spørsmål.id, svaralternativ.id)}
          className={styles.svaralternativknapp}
        >
          {svaralternativ.tekst}
        </Button>
      ))}
    </VStack>
  );
}
