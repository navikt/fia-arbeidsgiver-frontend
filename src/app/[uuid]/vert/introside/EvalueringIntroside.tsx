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
import { planType } from "@/app/_types/Plantyper";
import Planvisning from "./Planvisning";

export function EvalueringIntroside({ params, plan }: { params: { uuid: string }, plan?: planType }) {
	return (
		<Page background="bg-subtle">
			<PageBlock gutters width="xl">
				<VelkommenVirksomhet type="Evaluering">
					<KomIGangKnapp spørreundersøkelseId={params.uuid} />
				</VelkommenVirksomhet>
				<Planvisning plan={plan} />
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
								NAV bruker anonymisert statistikk for å videreutvikle
								tjenester.
							</ListItem>
						</List>
					</VStack>
				</Box>
			</PageBlock>
		</Page>
	);
}