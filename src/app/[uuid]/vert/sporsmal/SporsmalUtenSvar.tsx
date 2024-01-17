"use client";

import React from "react";
import vertStyles from "../vert.module.css";
import { BodyShort, Button, Heading, VStack } from "@navikt/ds-react";
import { KartleggingsType } from "@/utils/typer";

export default function SporsmalUtenSvar({
  kartleggingskategori,
}: {
  kartleggingskategori: KartleggingsType;
}) {
  const [aktivtSpørsmålindex, setAktivtSpørsmålindex] = React.useState(0);

  return (
    <VStack gap="4">
      <VStack align={"center"}>
        <Heading level={"2"} size={"small"} spacing>
          {aktivtSpørsmålindex + 1}/{kartleggingskategori?.spørsmål.length}{" "}
          {kartleggingskategori.tiltak} i virksomheten
        </Heading>
        <BodyShort size={"large"} spacing>
          {kartleggingskategori.spørsmål[aktivtSpørsmålindex].spørsmål}
        </BodyShort>
        {aktivtSpørsmålindex + 1 < kartleggingskategori.spørsmål.length && (
          <Button
            variant="secondary"
            className={vertStyles.knappHvitBred}
            onClick={() => {
              setAktivtSpørsmålindex(
                (aktivtSpørsmålindex + 1) %
                  kartleggingskategori.spørsmål.length,
              );
            }}
          >
            Neste
          </Button>
        )}
        {aktivtSpørsmålindex + 1 > 1 && (
          <Button
            variant="secondary"
            className={vertStyles.knappHvitBred}
            onClick={() => {
              setAktivtSpørsmålindex(
                (aktivtSpørsmålindex - 1) %
                  kartleggingskategori.spørsmål.length,
              );
            }}
          >
            Tilbake
          </Button>
        )}
      </VStack>
    </VStack>
  );
}
