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
import React from "react";

import spørsmålStyles from "./sporsmalsside.module.css";
import vertStyles from "../vert.module.css";
import { useSpørreundersøkelse } from "@/app/_api_hooks/sporsmalOgSvar";
import SpørsmålValg from "@/app/[uuid]/vert/sporsmal/SporsmalValg";
import { useRouter } from "next/navigation";

export default function SpørsmålBody({
  undersøkelsesId,
  del,
  delnavn,
}: {
  undersøkelsesId: string;
  del: number;
  delnavn: string;
}) {
  const { data: spørreundersøkelse, isLoading: lasterSpørsmål } =
    useSpørreundersøkelse(undersøkelsesId);

  const [aktivtSpørsmålindex, setAktivtSpørsmålindex] = React.useState(0);
  const router = useRouter();

  return (
    !lasterSpørsmål &&
    spørreundersøkelse && (
      <Page
        contentBlockPadding="none"
        footer={
          <Box as="footer" padding="8">
            <Page.Block gutters width="2xl">
              <SpørsmålValg
                index={aktivtSpørsmålindex}
                antallSpørsmål={spørreundersøkelse.length}
                byttSpørsmål={(nesteindeks: number) => {
                  if (
                    nesteindeks === spørreundersøkelse.length ||
                    nesteindeks < 0
                  ) {
                    router.push("oversikt");
                  } else {
                    setAktivtSpørsmålindex(Math.max(nesteindeks, 0));
                  }
                }}
              />
            </Page.Block>
          </Box>
        }
      >
        <HeaderVert />
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
