import { Button, VStack } from "@navikt/ds-react";
import vertStyles from "@/app/[uuid]/vert/[vertId]/vert.module.css";
import spørsmålStyles from "./sporsmalsside.module.css";

import React from "react";
import { router } from "next/client";

export enum RETNING {
  NESTE,
  TILBAKE,
  FULLFØR,
}

export default function SpørsmålNavigasjon({
  erViPåSisteSpørsmål,
  aktivtSpørsmålindex,
  setAktivtSpørsmålindex,
}: {
  erViPåSisteSpørsmål: boolean;
  aktivtSpørsmålindex: number;
  setAktivtSpørsmålindex: (index: number) => void;
}) {
  const naviger = (retning: RETNING) => {
    switch (retning) {
      case RETNING.FULLFØR:
        router.push("oversikt");
        break;
      case RETNING.NESTE:
        setAktivtSpørsmålindex(aktivtSpørsmålindex + 1);
        break;
      case RETNING.TILBAKE:
        setAktivtSpørsmålindex(Math.max(aktivtSpørsmålindex - 1, 0));
        break;
    }
  };

  return (
    <VStack align={"center"} className={spørsmålStyles.footer} gap={"4"}>
      {!erViPåSisteSpørsmål ? (
        <Button
          className={vertStyles.knappBred}
          onClick={() => {
            naviger(RETNING.NESTE);
          }}
        >
          Neste
        </Button>
      ) : erViPåSisteSpørsmål ? (
        <Button
          className={vertStyles.knappBred}
          onClick={() => {
            naviger(RETNING.FULLFØR);
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
          naviger(RETNING.TILBAKE);
        }}
      >
        Tilbake
      </Button>
    </VStack>
  );
}
