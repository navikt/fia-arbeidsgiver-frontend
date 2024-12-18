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
						>
							Hva er målet?
						</Heading>
						<List>
							<ListItem>
								Se tilbake på hva vi har samarbeidet om og evaluere hvordan det har gått.
							</ListItem>
							<ListItem>
								Diskutere hvordan dere vil jobbe videre på egen hånd.
							</ListItem>
						</List>
					</VStack>
					<VStack className={introsideStyles.gridCenter}>
						<Heading
							level="2"
							size="small"
						>
							Hvordan gjennomfører vi evalueringen?
						</Heading>
						<List>
							<ListItem>
								Alle svarer individuelt på spørsmål som er basert på samarbeidsplanen vår.
							</ListItem>
							<ListItem>
								Vi diskuterer resultatene i fellesskap.
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
						>
							Hva skjer med resultatene?
						</Heading>
						<List>
							<ListItem>
								Resultatene deles kun med dere og det registreres ikke hvem som har svart hva.
							</ListItem>
							<ListItem>
								Nav bruker anonymisert statistikk for å videreutvikle tjenesten.
							</ListItem>
						</List>
					</VStack>
				</Box>
			</PageBlock>
		</Page>
	);
}