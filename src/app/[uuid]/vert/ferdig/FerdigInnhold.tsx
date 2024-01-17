"use client";

import { Bleed, BodyShort, Box, Button, Page, VStack } from "@navikt/ds-react";
import ferdigStyles from "./ferdigside.module.css";
import vertStyles from "../vert.module.css";
import React from "react";
import { useRouter } from "next/navigation";

export default function FerdigInnhold() {
  const router = useRouter();

  return (
    <Page>
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
              Bra jobbet! Da har alle svar blitt logget og sendt til FIA (todo:
              logg og send svar til FIA). Rådgiveren sier litt om prosessen
              videre.
            </BodyShort>
            <Button
              variant="secondary"
              className={vertStyles.knappHvitBred}
              onClick={() => router.push("../../")}
            >
              Lukk kartlegging
            </Button>
          </VStack>
        </VStack>
      </Page.Block>
    </Page>
  );
}
