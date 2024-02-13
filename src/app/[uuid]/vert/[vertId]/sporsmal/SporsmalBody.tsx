"use client";

import {
  Bleed,
  BodyShort,
  Box,
  Heading,
  HStack,
  Page,
  VStack,
} from "@navikt/ds-react";
import React, { useEffect } from "react";

import spørsmålStyles from "./sporsmalsside.module.css";
import styles from "../../../kartlegging.module.css";
import SpørsmålNavigasjon from "./SpørsmålNavigasjon";
import { useAntallDeltakere } from "@/app/_api_hooks/useAntallDeltakere";
import {
  postVertNesteSpørsmål,
  useVertSpørreundersøkelse,
  useVertSpørsmålIndeks,
} from "@/app/_api_hooks/sporsmalOgSvar";
import { Deltakelsesstatus } from "@/app/_components/Deltakelsesstatus";

export default function SpørsmålBody({
  spørreundersøkelseId,
  vertId,
  del,
  delnavn,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  del: number;
  delnavn: string;
}) {
  const { data: spørreundersøkelse, isLoading: lasterSpørsmål } =
    useVertSpørreundersøkelse(spørreundersøkelseId, vertId);

  const { data: antallDeltakereData, isLoading: antallDeltakereLaster } =
    useAntallDeltakere({
      vertId,
      spørreundersøkelseId: spørreundersøkelseId,
    });

  const [aktivtSpørsmålindex, setAktivtSpørsmålindex] = React.useState(0);
  const { data } = useVertSpørsmålIndeks(spørreundersøkelseId, vertId);

  useEffect(() => {
    if (data && aktivtSpørsmålindex > data?.indeks) {
      postVertNesteSpørsmål(spørreundersøkelseId, vertId);
    }
  }, [aktivtSpørsmålindex, data, spørreundersøkelseId, vertId]);

  return (
    !lasterSpørsmål &&
    spørreundersøkelse && (
      <Page
        contentBlockPadding="none"
        footer={
          <Box as="footer" padding="24">
            <Page.Block width="2xl">
              <SpørsmålNavigasjon
                erViPåSisteSpørsmål={
                  aktivtSpørsmålindex >= spørreundersøkelse.length - 1
                }
                aktivtSpørsmålindex={aktivtSpørsmålindex}
                setAktivtSpørsmålindex={setAktivtSpørsmålindex}
              />
            </Page.Block>
          </Box>
        }
      >
        <Page.Block as={"main"}>
          <Bleed marginInline="full" asChild>
            <Box padding="5" className={styles.bleedKlar}>
              <HStack
                className={spørsmålStyles.bleedInnhold}
                justify={"space-between"}
              >
                <VStack>
                  <BodyShort size="medium">Del {del}</BodyShort>
                  <Heading size={"medium"}>
                    {delnavn} i virksomheten {aktivtSpørsmålindex + 1}/
                    {spørreundersøkelse.length}
                  </Heading>
                </VStack>
                <Deltakelsesstatus
                  antallDeltakere={antallDeltakereData?.antallDeltakere}
                  antallSvarMottatt={
                    antallDeltakereData?.antallSvar[aktivtSpørsmålindex].antall
                  }
                  isLoading={antallDeltakereLaster}
                />
              </HStack>
            </Box>
          </Bleed>

          <VStack gap="4" className={spørsmålStyles.spørsmålInnhold}>
            <Heading level={"2"} size={"small"} spacing>
              {spørreundersøkelse[aktivtSpørsmålindex].spørsmål}
            </Heading>
            {spørreundersøkelse[aktivtSpørsmålindex].svaralternativer.map(
              (svaralternativ) => (
                <BodyShort
                  key={svaralternativ.id}
                  size={"large"}
                  spacing
                  className={spørsmålStyles.innholdSvar}
                >
                  {svaralternativ.tekst}
                </BodyShort>
              ),
            )}
          </VStack>
        </Page.Block>
      </Page>
    )
  );
}
