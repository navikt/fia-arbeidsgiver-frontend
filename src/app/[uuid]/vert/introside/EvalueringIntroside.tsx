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
import { planType } from "@/app/_types/Plantyper";

export function EvalueringIntroside({ params, plan }: { params: { uuid: string }, plan?: planType }) {
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
				{
					plan?.temaer && (
						<Box
							borderRadius="xlarge"
							padding="10"
							background="bg-default"
							className={introsideStyles.startsideboks}
						>
							{
								plan.temaer.map((tema) => tema.inkludert ? (
									<>
										<Heading
											level="2"
											size="small"
											className={introsideStyles.subheading}
										>
											{tema.navn}
										</Heading>
										<PlanGraf undertemaer={tema.undertemaer} />
										<br />
									</>
								) : null)
							}
						</Box>

					)
				}
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