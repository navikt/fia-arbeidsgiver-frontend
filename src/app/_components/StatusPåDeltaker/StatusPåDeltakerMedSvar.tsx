"use client";

import { HStack } from "@navikt/ds-react";
import spørsmålStyles from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/[sporsmalId]/sporsmalsside.module.css";
import { PersonGroupFillIcon } from "@navikt/aksel-icons";
import React from "react";
import { AntallSvar } from "@/app/_components/StatusPåDeltaker/AntallSvar";
import { AntallDeltakere } from "@/app/_components/StatusPåDeltaker/AntallDeltakere";

export function StatusPåDeltakerMedSvar({
  spørreundersøkelseId,
  vertId,
  temaId,
  spørsmålId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaId: number;
  spørsmålId: string;
}) {
  return (
    <HStack className={spørsmålStyles.deltakere}>
      <PersonGroupFillIcon />
      <AntallSvar
        spørreundersøkelseId={spørreundersøkelseId}
        vertId={vertId}
        temaId={temaId}
        spørsmålId={spørsmålId}
      />{" "}
      av{" "}
      <AntallDeltakere
        spørreundersøkelseId={spørreundersøkelseId}
        vertId={vertId}
      />
    </HStack>
  );
}
