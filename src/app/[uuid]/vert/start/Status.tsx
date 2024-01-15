import React from "react";
import { PersonGroupIcon } from "@navikt/aksel-icons";
import { Heading } from "@navikt/ds-react";

import styles from "./startside.module.css";

export default function Status({
  antallDeltakere,
}: {
  antallDeltakere: number;
}) {
  return (
    <div className={styles.status}>
      <span>
        <PersonGroupIcon title="personer" fontSize={"3rem"} />
        {antallDeltakere}
      </span>
      <Heading level="2" size="medium">
        Venter på deltakere...
      </Heading>
    </div>
  );
}
