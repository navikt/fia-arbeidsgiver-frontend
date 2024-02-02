import { BodyShort } from "@navikt/ds-react";
import styles from "@/app/_components/komponenter.module.css";
import { PersonGroupIcon } from "@navikt/aksel-icons";
import React from "react";

export function Deltakere(props: { deltakere: number }) {
  return (
    <BodyShort className={styles.deltakere}>
      <PersonGroupIcon />
      {/* props.deltakere */}
    </BodyShort>
  );
}
