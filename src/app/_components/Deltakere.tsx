import { BodyShort, Loader } from "@navikt/ds-react";
import styles from "@/app/_components/komponenter.module.css";
import { PersonGroupIcon } from "@navikt/aksel-icons";
import React from "react";

export function Deltakere({
  antallDeltakere,
  isLoading,
}: {
  antallDeltakere?: number;
  isLoading?: boolean;
}) {
  return (
    <BodyShort className={styles.deltakere}>
      <PersonGroupIcon />
      {antallDeltakere}
      {isLoading &&
        (antallDeltakere === undefined || antallDeltakere === null) && (
          <Loader />
        )}
    </BodyShort>
  );
}
