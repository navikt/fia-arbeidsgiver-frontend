import type { Metadata } from "next";
import { BodyShort, Page, VStack } from "@navikt/ds-react";
import React from "react";
import BliMedKnapp from "./BliMedKnapp";
import styles from "./startside.module.css";
import Kartleggingsmøtetittel from "../Kartleggingsmøtetittel";
import { getCookies } from "cookies-next";
import { cookies } from "next/headers";
import { SPØRREUNDERSØKELSE_ID_STORAGE_KEY } from "@/utils/consts";

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
          <BliMedKnapp
            spørreundersøkelseId={params?.uuid}
            slettCookies={
              getCookies({ cookies })[SPØRREUNDERSØKELSE_ID_STORAGE_KEY] !==
              params?.uuid
            }
          />
        </VStack>
      </Page.Block>
    </Page>
  );
}
