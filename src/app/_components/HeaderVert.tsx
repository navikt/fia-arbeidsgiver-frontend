import { Heading, Page } from "@navikt/ds-react";
import styles from "./komponenter.module.css";
import React from "react";
import { Deltakere } from "@/app/_components/Deltakere";

export default function HeaderVert() {
  return (
    <Page.Block as={"header"} className={styles.header}>
      <Heading spacing level={"1"} size={"large"}>
        IA kartleggingsmøte
      </Heading>
      <Deltakere />
    </Page.Block>
  );
}
