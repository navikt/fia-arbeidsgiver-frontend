import { Heading, Page } from "@navikt/ds-react";
import type { Metadata } from "next";

import styles from "./startside.module.css";
import Logininformasjon from "./Logininformasjon";
import Status from "./Status";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Startside() {
  const antallDeltakere = 2;
  const lenke = "https://www.nrk.no";
  const kode = "12345";

  return (
    <Page className={styles.startside}>
      <Page.Block gutters width="xl">
        <Heading level="1" size="medium">
          Velkommen til kartleggingsmøte!
        </Heading>
        <Heading level="2" size="medium">
          Du logger inn ved å...
        </Heading>
      </Page.Block>
      <Page.Block gutters width="xl" className={styles.sideinnhold}>
        <Logininformasjon lenke={lenke} kode={kode} />
        <Status antallDeltakere={antallDeltakere} />
      </Page.Block>
    </Page>
  );
}
