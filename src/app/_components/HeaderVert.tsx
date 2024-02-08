import { Heading, Page } from "@navikt/ds-react";
import styles from "./komponenter.module.css";
import React from "react";
import { Deltakelsesstatus } from "@/app/_components/Deltakelsesstatus";

export default function HeaderVert({
  antallDeltakere,
  antallDeltakereLaster,
  antallSvarMottatt,
}: {
  antallDeltakere: number | undefined;
  antallDeltakereLaster: boolean | undefined;
  antallSvarMottatt: number | undefined;
}) {
  return (
    <Page.Block as={"header"} className={styles.header}>
      <Heading spacing level={"1"} size={"large"}>
        IA kartleggingsmøte
      </Heading>
      <Deltakelsesstatus
        antallDeltakere={antallDeltakere}
        antallSvarMottatt={antallSvarMottatt}
        isLoading={antallDeltakereLaster}
      />
    </Page.Block>
  );
}
