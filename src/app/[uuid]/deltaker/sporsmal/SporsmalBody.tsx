"use client";

import React from "react";
import { Bleed, BodyShort, Box, HStack, Page, VStack } from "@navikt/ds-react";
import { useRouter } from "next/navigation";

import Spørsmålsseksjon from "./Sporsmalsseksjon";
import styles from "./sporsmalsside.module.css";
import {
  useKategoristatus,
  useSpørreundersøkelse,
} from "@/app/_api_hooks/sporsmalOgSvar";
import Kartleggingsmøtetittel from "../Kartleggingsmøtetittel";
import globalStyles from "../../kartlegging.module.css";

export default function SpørsmålBody({
  spørreundersøkelsesId,
  storedSessionID,
  storedSisteSvarteID,
}: {
  spørreundersøkelsesId: string;
  storedSessionID?: string;
  storedSisteSvarteID?: string;
}) {
  const del = 1;
  const delnavn = "Partssamarbeidet";
  const router = useRouter();

  const { data: spørsmål } = useSpørreundersøkelse(spørreundersøkelsesId);
  const { data: kategoristatus } = useKategoristatus(spørreundersøkelsesId);

  React.useEffect(() => {
    if (!storedSessionID) {
      router.push("../deltaker");
    }
    console.log(`Kategoristatus er ${kategoristatus?.status}`);
  });

  return (
    <Page contentBlockPadding="none">
      <Page.Block gutters width="lg" className={styles.spørsmålssideblokk}>
        <Kartleggingsmøtetittel />
        <Bleed marginInline="full" asChild reflectivePadding>
          <Box padding="5" className={globalStyles.bleedKlar}>
            <HStack className={styles.bleedInnhold}>
              <VStack>
                <BodyShort size="medium">Del {del}</BodyShort>
                <BodyShort size="large">{delnavn}</BodyShort>
              </VStack>
            </HStack>
          </Box>
        </Bleed>
        <Spørsmålsseksjon
          spørsmål={spørsmål}
          spørreundersøkelsesId={spørreundersøkelsesId}
          storedSisteSvarteID={storedSisteSvarteID}
        />
      </Page.Block>
    </Page>
  );
}
