import { BodyShort, Heading, Page } from "@navikt/ds-react";
import styles from "./vert.module.css";
import { PersonGroupIcon } from "@navikt/aksel-icons";
import React from "react";

export default function HeaderVert({ deltakere }: { deltakere: number }) {
  return (
    <Page.Block as={"header"} className={styles.header}>
      <Heading spacing level={"1"} size={"large"}>
        IA kartleggingsmøte
      </Heading>
      <BodyShort className={styles.deltakere}>
        <PersonGroupIcon />
        {deltakere}
      </BodyShort>
    </Page.Block>
  );
}
