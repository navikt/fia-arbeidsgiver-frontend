"use client";

import React from "react";
import { Box, Heading, List, Page, VStack } from "@navikt/ds-react";
import introsideStyles from "./introside.module.css";
import { PageBlock } from "@navikt/ds-react/Page";
import KomIGangKnapp from "./KomIGangKnapp";
import { ListItem } from "@navikt/ds-react/List";
import { VelkommenVirksomhet } from "./VelkommenVirksomhet";

export function BehovsvurderingIntroside({
  params,
}: {
  params: { uuid: string };
}) {
  return (
    <Page>
      <PageBlock gutters width="xl">
        <VelkommenVirksomhet type="Behovsvurdering">
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
              <List data-aksel-migrated-v8 as="ul">
                <ListItem>
                  Få en felles forståelse for hvordan dere samarbeider om
                  sykefravær og arbeidsmiljø i dag.
                </ListItem>
                <ListItem>
                  Avklare hvilke behov dere har og hva som bør være fokus
                  fremover.
                </ListItem>
              </List>
            </Box>
            <Heading level="2" size="small" style={{ marginTop: "1.5rem" }}>
              Hvordan gjennomfører vi behovsvurderingen?
            </Heading>
            <Box marginBlock="space-16" asChild>
              <List data-aksel-migrated-v8 as="ul">
                <ListItem>
                  Vi skal diskutere temaene partssamarbeid, sykefraværsarbeid og
                  arbeidsmiljø.
                </ListItem>
                <ListItem>
                  Alle svarer individuelt på spørsmål før vi reflekterer og
                  diskuterer resultatene i fellesskap.
                </ListItem>
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
              <List data-aksel-migrated-v8 as="ul">
                <ListItem>
                  Resultatene deles kun med dere og det registreres ikke hvem
                  som har svart hva.
                </ListItem>
                <ListItem>
                  På Min side - Arbeidsgiver blir behovsvurderingen og andre
                  samarbeidsdokumenter tilgjengelig.
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
