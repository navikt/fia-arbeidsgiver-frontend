"use client";

import React from "react";
import {
	Box,
	Heading,
	List,
	Page,
	VStack,
} from "@navikt/ds-react";
import introsideStyles from "./introside.module.css";
import { PageBlock } from "@navikt/ds-react/Page";
import KomIGangKnapp from "./KomIGangKnapp";
import { ListItem } from "@navikt/ds-react/List";
import { VelkommenVirksomhet } from "./VelkommenVirksomhet";
import PlanGraf from "@/app/_components/Plan/PlanGraf";

export function EvalueringIntroside({ params }: { params: { uuid: string } }) {
	return (
		<Page background="bg-subtle">
			<PageBlock gutters width="xl">
				<VelkommenVirksomhet type="Evaluering">
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
							Evaluering for IA-samarbeidet
						</Heading>
						<List as="ul">
							<ListItem>
								Målet for møtet er å ....
							</ListItem>
						</List>
					</VStack>
				</Box>
				<Box
					borderRadius="xlarge"
					padding="10"
					background="bg-default"
					className={`${introsideStyles.startsideboks}`}
				>
					<PlanGraf undertemaer={[{
						id: 1,
						navn: "Partssamarbeid",
						målsetting: "Målet for møtet er å sette retning og felles mål for IA-samarbeidet.",
						inkludert: true,
						startDato: "2024-12-01",
						status: "PLANLAGT",
						sluttDato: "2025-01-01"
					}, {
						id: 2,
						navn: "Noe annet",
						målsetting: "Målet for møtet er å sette retning og felles mål for IA-samarbeidet.",
						inkludert: true,
						startDato: "2024-09-16",
						status: "FULLFØRT",
						sluttDato: "2024-10-31"
					}, {
						id: 3,
						navn: "Blabla",
						målsetting: "Målet for møtet er å sette retning og felles mål for IA-samarbeidet.",
						inkludert: true,
						startDato: "2024-10-16",
						status: "PÅGÅR",
						sluttDato: "2024-11-31"
					}, {
						id: 4,
						navn: "Dummydata",
						målsetting: "Målet for møtet er å sette retning og felles mål for IA-samarbeidet.",
						inkludert: true,
						startDato: "2024-09-16",
						status: "AVBRUTT",
						sluttDato: "2024-10-31"
					}]} />
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