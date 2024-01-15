import type { Metadata } from "next";
import Dellinje from "./Dellinje";
import { BodyShort, Heading, Page, VStack } from "@navikt/ds-react";
import styles from "./oversikt.module.css";
import React from "react";
import OversiktBunnlinje from "@/app/[uuid]/vert/oversikt/OversiktBunnlinje";
import { PersonGroupIcon } from "@navikt/aksel-icons";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Oversiktside() {
  const deltakere = 6;
  return (
    <Page
      contentBlockPadding="none"
      footer={
        <Page.Block as="footer">
          <OversiktBunnlinje />
        </Page.Block>
      }
    >
      <Page.Block as={"header"} className={styles["header"]}>
        <Heading spacing level={"1"} size={"large"}>
          IA kartleggingsmøte (nummer) med &quot;Virksomhetsnavn&quot;
        </Heading>
        <BodyShort className={styles["deltakere"]}>
          <PersonGroupIcon title="a11y-title" />
          {deltakere}
        </BodyShort>
      </Page.Block>
      <Page.Block as={"main"}>
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
      </Page.Block>
    </Page>
  );
}
