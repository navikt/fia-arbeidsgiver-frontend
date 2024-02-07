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
import HeaderVert from "@/app/_components/HeaderVert";
import React, { useEffect } from "react";

import spørsmålStyles from "./sporsmalsside.module.css";
import vertStyles from "../vert.module.css";
import SpørsmålNavigasjon from "./SpørsmålNavigasjon";
import { useAntallDeltakere } from "@/app/_api_hooks/useAntallDeltakere";
import {
  postVertNesteSpørsmål,
  useVertSpørreundersøkelse,
  useVertSpørsmålIndeks,
} from "@/app/_api_hooks/sporsmalOgSvar";

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
    if (data && aktivtSpørsmålindex >= data?.indeks) {
      postVertNesteSpørsmål(spørreundersøkelseId, vertId);
    }
  }, [aktivtSpørsmålindex, data]);

  return (
    !lasterSpørsmål &&
    spørreundersøkelse && (
      <Page
        contentBlockPadding="none"
        footer={
          <Box as="footer" padding="8">
            <Page.Block gutters width="2xl">
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
        <HeaderVert
          antallDeltakere={antallDeltakereData?.antallDeltakere}
          antallDeltakereLaster={antallDeltakereLaster}
        />
        <Page.Block as={"main"}>
          <Bleed marginInline="full" asChild>
            <Box padding="5" className={vertStyles.bleedKlar}>
              <HStack className={spørsmålStyles.bleedInnhold}>
                <VStack>
                  <BodyShort size="medium">Del {del}</BodyShort>
                  <BodyShort size="large">{delnavn}</BodyShort>
                </VStack>
              </HStack>
            </Box>
          </Bleed>

          <VStack gap="4" align={"center"}>
            <Heading level={"2"} size={"small"} spacing>
              {aktivtSpørsmålindex + 1}/{spørreundersøkelse.length} {delnavn} i
              virksomheten
            </Heading>
            <BodyShort
              size={"large"}
              spacing
              className={spørsmålStyles.innhold}
            >
              {spørreundersøkelse[aktivtSpørsmålindex].spørsmål}
            </BodyShort>
          </VStack>
        </Page.Block>
      </Page>
    )
  );
}
