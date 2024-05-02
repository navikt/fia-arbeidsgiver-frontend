"use client";

import { HStack } from "@navikt/ds-react";
import statusPåDeltakereStyles from "./statusPåDeltaker.module.css";
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
    <HStack className={statusPåDeltakereStyles.deltakere}>
      <PersonGroupFillIcon fontSize="3rem" />
      <AntallDeltakere
        spørreundersøkelseId={spørreundersøkelseId}
        vertId={vertId}
      />
      {" deltakere"}
    </HStack>
  );
}
