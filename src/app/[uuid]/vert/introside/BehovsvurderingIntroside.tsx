"use client";

import React from "react";
import {
	BodyLong,
	BodyShort,
	Box,
	Heading,
	HStack,
	List,
	Page,
	VStack,
} from "@navikt/ds-react";
import introsideStyles from "./introside.module.css";
import { PageBlock } from "@navikt/ds-react/Page";
import KomIGangKnapp from "./KomIGangKnapp";
import { ListItem } from "@navikt/ds-react/List";
import { VelkommenVirksomhet } from "./VelkommenVirksomhet";

export function BehovsvurderingIntroside({ params }: { params: { uuid: string } }) {
	return (
		<Page background="bg-subtle">
			<PageBlock gutters width="xl">
				<VelkommenVirksomhet spørreundersøkelseId={params.uuid}>
					<KomIGangKnapp spørreundersøkelseId={params.uuid} />
				</VelkommenVirksomhet>
				<Box
					borderRadius="xlarge"
					padding="10"
					background="bg-default"
					className={`${introsideStyles.startsideboks} ${introsideStyles.startsidegrid}`}
				>
					<VStack className={introsideStyles.gridCenter}>
						<Heading
							level="2"
							size="small"
							className={introsideStyles.subheading}
						>
							Behovsvurdering for IA-samarbeidet
						</Heading>
						<List as="ul">
							<ListItem>
								Målet for møtet er å sette retning og felles mål for
								IA-samarbeidet.
							</ListItem>
							<ListItem>
								Vi skal sammen reflektere over hvordan dere jobber med
								sykefravær og arbeidsmiljø.
							</ListItem>
							<ListItem>
								Vi er her for å hjelpe med utgangspunkt i en felles vurdering av
								dagens situasjon.
							</ListItem>
							<ListItem>
								Vi skal se på tre temaer; <b>partssamarbeid</b>,{" "}
								<b>sykefraværsarbeid</b> og <b>arbeidsmiljø.</b>
							</ListItem>
							<ListItem>
								Hvert tema introduseres før dere svarer individuelt på spørsmål.
							</ListItem>
							<ListItem>
								Vi ser på resultatene i fellesskap og diskuterer hva som bør
								vektlegges i samarbeidsperioden.
							</ListItem>
						</List>
					</VStack>
				</Box>
				<Box
					borderRadius="xlarge"
					padding="10"
					background="bg-default"
					className={`${introsideStyles.startsideboks} ${introsideStyles.startsidegrid}`}
				>
					<VStack className={introsideStyles.gridCenter}>
						<Heading
							level="2"
							size="small"
							className={introsideStyles.subheading}
						>
							IA-samarbeidet
						</Heading>
						<BodyLong>
							NAV tilbyr hjelp og kompetanseheving for å forebygge og redusere
							sykefravær. I en avtalt periode kan vi hjelpe dere med å:
						</BodyLong>
					</VStack>
					<HStack gap="2" className={introsideStyles.gridCenter}>
						<StartsideBoksElement>
							<b>samarbeide</b> om arbeidsmiljø og sykefravær
						</StartsideBoksElement>
						<StartsideBoksElement>
							<b>øke kvaliteten</b> på sykefraværsarbeidet
						</StartsideBoksElement>
						<StartsideBoksElement>
							jobbe <b>forebyggende</b> med arbeidsmiljø
						</StartsideBoksElement>
					</HStack>
				</Box>
				<Box
					borderRadius="xlarge"
					padding="10"
					background="bg-default"
					className={`${introsideStyles.startsideboks} ${introsideStyles.startsidegrid}`}
				>
					<VStack className={introsideStyles.gridCenter}>
						<Heading
							level="2"
							size="small"
							className={introsideStyles.subheading}
						>
							Resultater og personvern
						</Heading>
						<List>
							<ListItem>
								Alle svar er anonyme og vi registrerer ikke hvem som har svart
								hva.
							</ListItem>
							<ListItem>
								Resultatene brukes som grunnlag for samarbeidet og deles kun med
								dere.
							</ListItem>
							<ListItem>
								NAV bruker kun anonymisert statistikk for å videreutvikle
								tjenester.
							</ListItem>
						</List>
					</VStack>
				</Box>
			</PageBlock>
		</Page>
	);
}


function StartsideBoksElement({ children }: { children: React.ReactNode }) {
	return (
		<Box
			background="surface-action-subtle"
			borderRadius="xlarge"
			padding="4"
			className={introsideStyles.startsideinfoboks}
		>
			<BodyShort className={introsideStyles.startsideinfoboksinnhold}>
				{children}
			</BodyShort>
		</Box>
	);
}
