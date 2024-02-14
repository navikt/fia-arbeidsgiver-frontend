import { Page } from "@navikt/ds-react";
import type { Metadata } from "next";
import styles from "./startside.module.css";
import Logininformasjon from "./Logininformasjon";
import Status from "./Status";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Startside({
  params,
}: {
  params: { uuid: string; vertId: string };
}) {
  return (
    <Page className={styles.startside}>
      <Page.Block gutters width="xl" className={styles.sideinnhold}>
        <Logininformasjon />
        <Status spørreundersøkelseId={params.uuid} vertId={params.vertId} />
      </Page.Block>
    </Page>
  );
}
