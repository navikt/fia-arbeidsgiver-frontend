import { BodyShort } from "@navikt/ds-react";
import styles from "@/app/_components/komponenter.module.css";
import { PersonGroupIcon } from "@navikt/aksel-icons";
import React from "react";

export function Deltakere() {
  return (
    <BodyShort className={styles.deltakere}>
      <PersonGroupIcon />
      {/*antallDeltakere*/}
    </BodyShort>
  );
}
