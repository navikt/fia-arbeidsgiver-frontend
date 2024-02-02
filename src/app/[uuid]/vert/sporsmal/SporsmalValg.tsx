import { Button, VStack } from "@navikt/ds-react";
import vertStyles from "@/app/[uuid]/vert/vert.module.css";
import spørsmålStyles from "./sporsmalsside.module.css";

import React from "react";

export default function SpørsmålValg({
  index,
  antallSpørsmål,
  byttSpørsmål,
}: {
  index: number;
  antallSpørsmål: number;
  byttSpørsmål: (nesteIndeks: number) => void;
}) {
  return (
    <VStack align={"center"} className={spørsmålStyles.footer} gap={"4"}>
      {index < antallSpørsmål - 1 ? (
        <Button
          className={vertStyles.knappBred}
          onClick={() => {
            byttSpørsmål(index + 1);
          }}
        >
          Neste
        </Button>
      ) : index == antallSpørsmål - 1 ? (
        <Button
          className={vertStyles.knappBred}
          onClick={() => {
            byttSpørsmål(index + 1);
          }}
        >
          Fullfør
        </Button>
      ) : (
        <></>
      )}

      <Button
        variant="secondary"
        className={vertStyles.knappHvitBred}
        onClick={() => {
          byttSpørsmål(index - 1);
        }}
      >
        Tilbake
      </Button>
    </VStack>
  );
}
