"use client";

import { HStack } from "@navikt/ds-react";
import spørsmålStyles from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/[sporsmalId]/sporsmalsside.module.css";
import { PersonGroupFillIcon } from "@navikt/aksel-icons";
import React from "react";
import { AntallSvar } from "@/app/_components/StatusPåDeltaker/AntallSvar";
import { AntallDeltakere } from "@/app/_components/StatusPåDeltaker/AntallDeltakere";
import { Tema } from "@/app/_types/tema";

export function StatusPåDeltakerMedSvar({
  spørreundersøkelseId,
  vertId,
  tema,
  spørsmålId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  tema: Tema;
  spørsmålId: string;
}) {
  return (
    <HStack className={spørsmålStyles.deltakere}>
      <PersonGroupFillIcon />
      <HStack>
        <AntallSvar
          spørreundersøkelseId={spørreundersøkelseId}
          vertId={vertId}
          tema={tema}
          spørsmålId={spørsmålId}
        />
        av{" "}
        <AntallDeltakere
          spørreundersøkelseId={spørreundersøkelseId}
          vertId={vertId}
        />
      </HStack>
    </HStack>
  );
}
