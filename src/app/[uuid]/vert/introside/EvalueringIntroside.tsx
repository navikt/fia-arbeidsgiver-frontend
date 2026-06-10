"use client";

import React from "react";
import { Box, Heading, List, Page, VStack } from "@navikt/ds-react";
import introsideStyles from "./introside.module.css";
import { PageBlock } from "@navikt/ds-react/Page";
import KomIGangKnapp from "./KomIGangKnapp";
import { ListItem } from "@navikt/ds-react/List";
import { VelkommenVirksomhet } from "./VelkommenVirksomhet";

export function EvalueringIntroside({ params }: { params: { uuid: string } }) {
  return (
    <Page>
      <PageBlock gutters width="xl">
        <VelkommenVirksomhet type="Evaluering">
          <KomIGangKnapp spørreundersøkelseId={params.uuid} />
        </VelkommenVirksomhet>
        <Box
          borderRadius="12"
          padding="space-40"
          className={`${introsideStyles.startsideboks} ${introsideStyles.startsidegrid}`}
        >
          <VStack className={introsideStyles.gridCenter}>
            <Heading level="2" size="small">
              Hva er målet?
            </Heading>
            <Box marginBlock="space-16" asChild>
              <List data-aksel-migrated-v8>
                <ListItem>
                  Se tilbake på hva vi har samarbeidet om og evaluere hvordan
                  det har gått.
                </ListItem>
                <ListItem>
                  Diskutere hvordan dere vil jobbe videre på egen hånd.
                </ListItem>
              </List>
            </Box>
          </VStack>
          <VStack className={introsideStyles.gridCenter}>
            <Heading level="2" size="small">
              Hvordan gjennomfører vi evalueringen?
            </Heading>
            <Box marginBlock="space-16" asChild>
              <List data-aksel-migrated-v8>
                <ListItem>
                  Alle svarer individuelt på spørsmål som er basert på
                  samarbeidsplanen vår.
                </ListItem>
                <ListItem>Vi diskuterer resultatene i fellesskap.</ListItem>
              </List>
            </Box>
          </VStack>
        </Box>
        <Box
          borderRadius="12"
          padding="space-40"
          className={`${introsideStyles.startsideboks} ${introsideStyles.startsidegrid}`}
        >
          <VStack className={introsideStyles.gridCenter}>
            <Heading level="2" size="small">
              Hva skjer med resultatene?
            </Heading>
            <Box marginBlock="space-16" asChild>
              <List data-aksel-migrated-v8>
                <ListItem>
                  Resultatene deles kun med dere og det registreres ikke hvem
                  som har svart hva.
                </ListItem>
                <ListItem>
                  Nav bruker anonymisert statistikk for å videreutvikle
                  tjenesten.
                </ListItem>
              </List>
            </Box>
          </VStack>
        </Box>
      </PageBlock>
    </Page>
  );
}
