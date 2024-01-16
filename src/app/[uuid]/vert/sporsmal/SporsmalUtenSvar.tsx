"use client";

import React from "react";
import styles from "./spørsmålsside.module.css";
import { BodyShort, Button, Heading, VStack } from "@navikt/ds-react";
import { KartleggingsKategori, SpørsmålType } from "@/utils/typer";

export default function SporsmalUtenSvar({
  kartleggingskategori,
}: {
  kartleggingskategori: KartleggingsKategori;
}) {
  const [aktivtSpørsmålindex, setAktivtSpørsmålindex] = React.useState(0);
  const spørsmål = kartleggingskategori;

  return (
    <VStack gap="4" className={styles.spørsmålBody}>
      <VStack align={"center"}>
        <Heading level={"2"} size={"small"} spacing>
          {aktivtSpørsmålindex + 1}/{spørsmål?.spørsmål.length}{" "}
          {kartleggingskategori.tiltak} i virksomheten
        </Heading>
        <BodyShort size={"large"} spacing>
          {spørsmål.spørsmål[aktivtSpørsmålindex].spørsmål}
        </BodyShort>
        <Button
          variant="secondary"
          className={styles.knappHvitBred}
          onClick={() =>
            setAktivtSpørsmålindex(
              (aktivtSpørsmålindex + 1) % spørsmål.spørsmål.length,
            )
          }
        >
          Neste
        </Button>
      </VStack>
    </VStack>
  );
}
