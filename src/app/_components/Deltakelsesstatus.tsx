import { BodyShort, Loader } from "@navikt/ds-react";
import styles from "@/app/_components/komponenter.module.css";
import { PersonGroupIcon } from "@navikt/aksel-icons";
import React from "react";

export function Deltakelsesstatus({
  antallDeltakere,
  antallSvarMottatt,
  isLoading,
}: {
  antallDeltakere?: number;
  antallSvarMottatt?: number | undefined;
  isLoading?: boolean;
}) {
  const skalViseAntallSvar = antallSvarMottatt !== undefined;

  return (
    <BodyShort className={styles.deltakere}>
      <PersonGroupIcon />
      {isLoading &&
        (antallDeltakere === undefined || antallDeltakere === null) && (
          <Loader />
        )}
      {skalViseAntallSvar && `${antallSvarMottatt} av `}
      {antallDeltakere}
      {skalViseAntallSvar && " har svart"}
    </BodyShort>
  );
}
