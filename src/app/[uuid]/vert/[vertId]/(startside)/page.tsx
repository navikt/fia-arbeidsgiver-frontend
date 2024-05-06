import type { Metadata } from "next";
import React from "react";
import {
  BodyLong,
  BodyShort,
  Box,
  HStack,
  Heading,
  List,
  Page,
  VStack,
} from "@navikt/ds-react";
import startsideStyles from "./startside.module.css";
import { PageBlock } from "@navikt/ds-react/Page";
import Headerlinje from "@/app/_components/Headerlinje";
import KomIGangKnapp from "./KomIGangKnapp";
import { ListItem } from "@navikt/ds-react/List";
import { Stepper, StepperStep } from "@navikt/ds-react/Stepper";

export const metadata: Metadata = {
  title: "Velkommen",
};

export default function Startside({
  params,
}: {
  params: { uuid: string; vertId: string };
}) {
  return (
    <Page background="bg-subtle">
      <PageBlock gutters width="xl">
        {/* TODO: Legg inn virksomhetsnavn: "Velkommen, [virksomhet]" */}
        <Headerlinje tittel="Velkommen">
          <KomIGangKnapp
            vertId={params.vertId}
            spørreundersøkelseId={params.uuid}
          />
        </Headerlinje>
        <Box
          borderRadius="xlarge"
          padding="10"
          background="bg-default"
          className={`${startsideStyles.startsideboks} ${startsideStyles.startsidegrid}`}
        >
          <FremgangsmåteStepper />
          <VStack className={startsideStyles.gridFull}>
            <Heading
              level="2"
              size="small"
              className={startsideStyles.subheading}
            >
              Behovsavklaring
            </Heading>
            <BodyLong>
              I dagens møte skal vi identifisere hva dere har mest behov for å
              jobbe med. Dette er kun en kartlegging av dagens situasjon - ikke
              en test. Kartleggingen består av spørsmål som besvares
              individuelt, deretter ser vi på svarene sammen og diskuterer hva
              vi skal fokusere på i samarbeidsperioden.
            </BodyLong>
          </VStack>
          <HStack gap="2" className={startsideStyles.gridCenter}>
            <StartsideBoksElement tittel="Svare individuelt på spørsmål" />
            <StartsideBoksElement tittel="Reflektere og diskutere sammen" />
          </HStack>
          <VStack className={startsideStyles.gridFull}>
            <Heading
              level="2"
              size="small"
              className={startsideStyles.subheading}
            >
              IA-avtalen
            </Heading>
            <Heading level="3" size="small">
              Hovedmålet er å få ned sykefraværet og redusere frafall fra
              arbeidslivet.
            </Heading>
            <BodyLong>
              NAV Arbeidslivssenter tilbyr hjelp med sykefraværsarbeid og
              arbeidsmiljø. Gjennom et tidsavgrenset samarbeid med ledere,
              tillitsvalgte og verneombud (partsgruppe) kan NAV tilby tjenester
              for å:
            </BodyLong>
          </VStack>
          <HStack gap="2" className={startsideStyles.gridCenter}>
            <StartsideBoksElement tittel="Forbedre arbeidsmiljøet og redusere sykefraværet" />
            <StartsideBoksElement tittel="Øke kvaliteten på sykefraværsarbeidet" />
            <StartsideBoksElement tittel="Jobbe målrettet og kunnskapsbasert med arbeidsmiljø" />
          </HStack>
        </Box>
        <Box
          borderRadius="xlarge"
          padding="10"
          background="bg-default"
          className={startsideStyles.startsideboks}
        >
          <Heading
            level="2"
            size="small"
            className={startsideStyles.subheading}
          >
            Resultater og personvern
          </Heading>
          <List>
            <ListItem>
              Alle svar er anonyme og kan ikke spores tilbake til deltakere
            </ListItem>
            <ListItem>
              Dere eier all data og resultatene blir delt etter møtet
            </ListItem>
            <ListItem>Resultatene deles ikke med andre.</ListItem>
            <ListItem>
              NAV benytter kun statistikk for å videreutvikle tjenester
            </ListItem>
          </List>
        </Box>
      </PageBlock>
    </Page>
  );
}

function FremgangsmåteStepper() {
  return (
    <Stepper
      activeStep={2}
      orientation="horizontal"
      className={startsideStyles.gridCenter}
    >
      <StepperStep interactive={false}>Introduksjon/infomøte</StepperStep>
      <StepperStep interactive={false}>Behovsavklaring</StepperStep>
      <StepperStep interactive={false}>Planlegge</StepperStep>
      <StepperStep interactive={false}>Samarbeide</StepperStep>
      <StepperStep interactive={false}>Evaluere</StepperStep>
    </Stepper>
  );
}

function StartsideBoksElement({
  tittel,
  undertittel,
}: {
  tittel: string;
  undertittel?: string;
}) {
  return (
    <Box
      background="surface-action-subtle"
      borderRadius="xlarge"
      padding="4"
      className={startsideStyles.startsideinfoboks}
    >
      <BodyShort>{tittel}</BodyShort>
      {undertittel && <BodyShort>{undertittel}</BodyShort>}
    </Box>
  );
}
