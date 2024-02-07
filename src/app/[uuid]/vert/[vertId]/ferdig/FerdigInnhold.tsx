"use client";

import { Bleed, BodyShort, Box, Button, Page, VStack } from "@navikt/ds-react";
import ferdigStyles from "./ferdigside.module.css";
import vertStyles from "../vert.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import HeaderVert from "@/app/_components/HeaderVert";
import { deleteCookie } from "cookies-next";
import { SESSION_ID_STORAGE_KEY } from "@/utils/consts";
import { useAntallDeltakere } from "@/app/_api_hooks/useAntallDeltakere";

export default function FerdigInnhold({
  undersøkelsesId,
  vertId,
}: {
  undersøkelsesId: string;
  vertId: string;
}) {
  const router = useRouter();
  React.useEffect(() => {
    deleteCookie(SESSION_ID_STORAGE_KEY);
  });

  const { data: antallDeltakereData, isLoading: antallDeltakereLaster } =
    useAntallDeltakere({
      vertId,
      spørreundersøkelseId: undersøkelsesId,
    });

  return (
    <Page
      contentBlockPadding="none"
      footer={
        <Box as="footer" padding="8">
          <Page.Block gutters width="2xl" className={vertStyles.footer}>
            <Button
              variant="secondary"
              className={vertStyles.knappHvitBred}
              onClick={() => router.push("../../../")}
            >
              Lukk kartlegging
            </Button>
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
          <Box padding="5" className={vertStyles.bleedFerdig}>
            <BodyShort size={"large"} className={ferdigStyles.bleedInnhold}>
              Ferdig!
            </BodyShort>
          </Box>
        </Bleed>
        <VStack gap="4">
          <VStack align={"center"}>
            <BodyShort size={"large"} spacing>
              Bra jobbet! Da har alle svar blitt logget og sendt til Fia.
              Rådgiveren sier litt om prosessen videre.
            </BodyShort>
          </VStack>
        </VStack>
      </Page.Block>
    </Page>
  );
}
