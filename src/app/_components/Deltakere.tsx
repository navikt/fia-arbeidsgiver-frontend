import { BodyShort, Loader } from "@navikt/ds-react";
import styles from "@/app/_components/komponenter.module.css";
import { PersonGroupIcon } from "@navikt/aksel-icons";
import React from "react";

export function Deltakere({
  antallDeltakere,
  antallSvarMottatt,
  isLoading,
}: {
  antallDeltakere?: number;
  antallSvarMottatt: number | undefined;
  isLoading?: boolean;
}) {
  return (
    <BodyShort className={styles.deltakere}>
      <PersonGroupIcon />
      {antallSvarMottatt !== undefined && `${antallSvarMottatt} av `}
      {antallDeltakere}
      {isLoading &&
        (antallDeltakere === undefined || antallDeltakere === null) && (
          <Loader />
        )}
    </BodyShort>
  );
}
