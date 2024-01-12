"use client";
import React from "react";
import { Button } from "@navikt/ds-react";
import { SpørsmålType } from "./typer";

import styles from "./spørsmålsside.module.css";

export function Spørsmål({
  spørsmål,
  velgSvar,
  valgtSvar,
}: {
  spørsmål: SpørsmålType;
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
