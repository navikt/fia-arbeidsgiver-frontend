import { Button, HStack } from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import spørsmålStyles from "./sporsmalsside.module.css";
import React from "react";
import { useRouter } from "next/navigation";

export enum RETNING {
  NESTE,
  TILBAKE,
}

export default function SpørsmålNavigasjon({
  nesteSpørsmålId,
  forrigeSporsmalId,
}: {
  nesteSpørsmålId: string | null;
  forrigeSporsmalId: string | null;
}) {
  const router = useRouter();

  const naviger = (retning: RETNING) => {
    switch (retning) {
      case RETNING.NESTE:
        if (nesteSpørsmålId === null) {
          router.push(`../oversikt`);
          break;
        } else {
          router.push(`./${nesteSpørsmålId}`);
          break;
        }
      case RETNING.TILBAKE:
        if (forrigeSporsmalId === null) {
          router.push(`./../oversikt`);
          break;
        } else {
          router.push(`./${forrigeSporsmalId}`);
          break;
        }
    }
  };

  return (
    <HStack className={spørsmålStyles.footer} gap={"4"}>
      <Button
        variant="secondary"
        className={kartleggingStyles.knappHvitBred}
        onClick={() => {
          naviger(RETNING.TILBAKE);
        }}
      >
        Tilbake
      </Button>
      <Button
        className={kartleggingStyles.knappBred}
        onClick={() => {
          naviger(RETNING.NESTE);
        }}
      >
        {nesteSpørsmålId !== null ? "Neste" : "Fullfør"}
      </Button>
    </HStack>
  );
}
