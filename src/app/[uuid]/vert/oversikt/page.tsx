import type { Metadata } from "next";
import Dellinje from "./Dellinje";
import { Page, VStack } from "@navikt/ds-react";
import styles from "./oversikt.module.css";
import SluttKnapper from "@/app/[uuid]/vert/oversikt/SluttKnapper";
import Deltakere from "@/app/[uuid]/vert/oversikt/Deltakere";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Oversiktside() {
  const deltakere = 6;
  return (
    <Page className={styles["oversikt"]}>
      <h1 className={styles["tekst-overskrift"]}>
        IA kartleggingsmøte (nummer) med &quot;Virksomhetsnavn&quot;
      </h1>
      <Deltakere deltakere={deltakere} />
      <VStack gap="4">
        <Dellinje
          delnavn="Partssamarbeid"
          delnummer={1}
          tid={10}
          punkter={10}
        />
        <Dellinje
          delnavn="Systematisk sykefravær"
          delnummer={2}
          tid={15}
          punkter={12}
        />
        <Dellinje
          delnavn="Tilrettelegging og medvirkning"
          delnummer={3}
          tid={5}
          punkter={4}
        />
      </VStack>
      <Page.Block gutters width="lg">
        <SluttKnapper></SluttKnapper>
      </Page.Block>
    </Page>
  );
}
