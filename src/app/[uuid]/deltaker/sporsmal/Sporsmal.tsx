import React from "react";
import { Button } from "@navikt/ds-react";

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
    <div>
      <div className={styles.spørsmålstekst}>{spørsmål.spørsmål}</div>
      {spørsmål.svaralternativer.map((svaralternativ) => (
        <div key={svaralternativ.id}>
          <Button
            variant={valgtSvar === svaralternativ.id ? "primary" : "secondary"}
            id={svaralternativ.id}
            onClick={() => velgSvar(spørsmål.id, svaralternativ.id)}
            className={styles.svaralternativknapp}
          >
            {svaralternativ.tekst}
          </Button>
        </div>
      ))}
    </div>
  );
}
