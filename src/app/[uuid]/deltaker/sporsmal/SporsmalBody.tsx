"use client";

import React from "react";
import { Bleed, Box, Detail, Heading, Page } from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { SESSION_ID_STORAGE_KEY } from "@/app/_api_hooks/bliMed";

import Spørsmålsseksjon from "./Sporsmalsseksjon";
import styles from "./sporsmalsside.module.css";
import { useSpørreundersøkelse } from "@/app/_api_hooks/sporreundersokelse";

export default function SpørsmålBody({
  undersøkelsesId,
}: {
  undersøkelsesId: string;
}) {
  const del = 1;
  const delnavn = "Partssamarbeidet";
  const router = useRouter();

  const { data: spørsmål } = useSpørreundersøkelse(undersøkelsesId);

  React.useEffect(() => {
    localStorage.getItem(SESSION_ID_STORAGE_KEY);

    if (!localStorage.getItem(SESSION_ID_STORAGE_KEY)) {
      router.push("../deltaker");
    }
  });

  return (
    <Page contentBlockPadding="none">
      <Page.Block gutters width="lg" className={styles.spørsmålssideblokk}>
        <Heading level="1" size="medium">
          IA kartleggingsmøte
        </Heading>
        <Bleed marginInline="24 24" asChild reflectivePadding>
          <Box background="surface-alt-3-strong" className={styles.banner}>
            <Detail>Del {del}</Detail>
            <Heading level="4" size="xsmall">
              {delnavn}
            </Heading>
          </Box>
        </Bleed>
        <Spørsmålsseksjon
          spørsmål={spørsmål}
          undersøkelsesId={undersøkelsesId}
        />
      </Page.Block>
    </Page>
  );
}
