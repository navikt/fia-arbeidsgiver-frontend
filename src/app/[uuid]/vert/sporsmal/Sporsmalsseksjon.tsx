"use client";

import React from "react";
import styles from "./spørsmålsside.module.css";
import { BodyShort, Button, Heading, VStack } from "@navikt/ds-react";
import { SpørsmålType } from "@/utils/typer";
import { eksempelFraBackend } from "@/utils/dummydata";

export default function Spørsmålsseksjon() {
  const [aktivtSpørsmålindex, setAktivtSpørsmålindex] = React.useState(0);
  const spørsmål: SpørsmålType[] = eksempelFraBackend;

  return (
    <VStack align={"center"}>
      <Heading level={"2"} size={"small"} spacing>
        {aktivtSpørsmålindex + 1}/{spørsmål?.length} Hvor enig eller uenig er
        dere i følgende utsagn?
      </Heading>
      <BodyShort size={"large"} spacing>
        {spørsmål[aktivtSpørsmålindex].spørsmål}
      </BodyShort>
      <Button
        variant="secondary"
        className={styles.knappHvitBred}
        onClick={() =>
          setAktivtSpørsmålindex((aktivtSpørsmålindex + 1) % spørsmål.length)
        }
      >
        Neste
      </Button>
    </VStack>
  );
}
