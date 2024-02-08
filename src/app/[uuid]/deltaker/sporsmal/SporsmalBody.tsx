"use client";

import React from "react";
import { Bleed, Box, Detail, Heading, Page } from "@navikt/ds-react";
import { useRouter } from "next/navigation";

import Spørsmålsseksjon from "./Sporsmalsseksjon";
import styles from "./sporsmalsside.module.css";
import {
  useSpørreundersøkelse,
  useSpørsmålIndeks,
} from "@/app/_api_hooks/sporsmalOgSvar";
import Kartleggingsmøtetittel from "../Kartleggingsmøtetittel";

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
  const { data: spørsmålIndeks } = useSpørsmålIndeks(spørreundersøkelsesId);

  React.useEffect(() => {
    console.log(`Spørsmålindeks er: ${spørsmålIndeks?.indeks}`);
    if (!storedSessionID) {
      router.push("../deltaker");
    }
  });

  return (
    <Page contentBlockPadding="none">
      <Page.Block gutters width="lg" className={styles.spørsmålssideblokk}>
        <Kartleggingsmøtetittel />
        <Bleed marginInline="24 24" asChild reflectivePadding>
          <Box background="surface-alt-3-strong" className={styles.banner}>
            <Detail>Del {del}</Detail>
            <Heading level="4" size="xsmall">
              {delnavn}
            </Heading>
          </Box>
        </Bleed>
        {spørsmålIndeks && (
          <Spørsmålsseksjon
            spørsmål={spørsmål}
            undersøkelsesId={spørreundersøkelsesId}
            storedSisteSvarteID={storedSisteSvarteID}
            gjeldendeSpørsmålindex={spørsmålIndeks.indeks}
          />
        )}
      </Page.Block>
    </Page>
  );
}
