"use client";

import React from "react";
import {
  Bleed,
  BodyShort,
  Box,
  HStack,
  Loader,
  Page,
  VStack,
} from "@navikt/ds-react";
import { useRouter } from "next/navigation";

import Spørsmålsseksjon from "./Sporsmalsseksjon";
import styles from "./sporsmalsside.module.css";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/sporsmalOgSvar";
import globalStyles from "../../../kartlegging.module.css";
import CookieHandler from "@/utils/CookieHandler";

export default function SpørsmålBody({
  spørreundersøkelsesId,
  spørsmålId,
}: {
  spørreundersøkelsesId: string;
  spørsmålId: string;
}) {
  const del = 1;
  const delnavn = "Partssamarbeidet";
  const router = useRouter();
  const cookieHandler = new CookieHandler(spørreundersøkelsesId);

  const storedSessionID = cookieHandler.sesjonsID;

  const spørsmålOgSvar = useSpørsmålOgSvar(spørreundersøkelsesId, spørsmålId);

  React.useEffect(() => {
    if (!storedSessionID) {
      router.push("../../deltaker");
    }
  });

  return (
    <Page contentBlockPadding="none">
      <Page.Block gutters width="lg" className={styles.spørsmålssideblokk}>
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
        {spørsmålOgSvar.isLoading || spørsmålOgSvar.data === undefined ? (
          <VStack gap={"4"} align={"center"}>
            <Loader size="3xlarge" title="Laster..." />
          </VStack>
        ) : (
          <Spørsmålsseksjon
            spørsmålOgSvar={spørsmålOgSvar.data}
            spørsmålId={spørsmålId}
            spørreundersøkelsesId={spørreundersøkelsesId}
          />
        )}
      </Page.Block>
    </Page>
  );
}
