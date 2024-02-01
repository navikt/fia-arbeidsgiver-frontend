import type { Metadata } from "next";
import { BodyShort, Heading, Page, VStack } from "@navikt/ds-react";
import React from "react";
import BliMedKnapp from "./BliMedKnapp";
import styles from "./startside.module.css";
import Kartleggingsmøtetittel from "../Kartleggingsmøtetittel";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Landingsside({ params }: { params: { uuid: string } }) {
  return (
    <Page contentBlockPadding="none">
      <Page.Block gutters width="lg">
        <VStack gap={"4"}>
          <Kartleggingsmøtetittel />
          <BodyShort align="center" className={styles.sidetekst}>
            Klikk på &quot;Bli med!&quot; for å delta på kartleggingsmøtet.
          </BodyShort>
          <BliMedKnapp undersøkelsesID={params?.uuid} />
        </VStack>
      </Page.Block>
    </Page>
  );
}
