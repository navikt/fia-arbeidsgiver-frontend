"use client";

import { BodyShort, HStack } from "@navikt/ds-react";
import spørsmålStyles from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/[sporsmalId]/sporsmalsside.module.css";
import { PersonGroupFillIcon } from "@navikt/aksel-icons";
import React from "react";
import { AntallDeltakere } from "@/app/_components/StatusPåDeltaker/AntallDeltakere";

export function StatusPåDeltaker({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  return (
    <HStack className={spørsmålStyles.deltakere}>
      <PersonGroupFillIcon />
      <AntallDeltakere
        spørreundersøkelseId={spørreundersøkelseId}
        vertId={vertId}
      />
    </HStack>
  );
}
