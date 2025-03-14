import { TemaDto } from "@/app/_types/TemaDto";
import React from "react";
import { BodyShort, Box, List } from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";
import { SpørreundersøkelseInfoDto } from "@/app/_types/SpørreundersøkelseInfoDto";
import PlanGraf from "@/app/_components/Plan/PlanGraf";

export default function Infoblokk({ tema, spørreundersøkelseInfo }: { tema: TemaDto, spørreundersøkelseInfo?: SpørreundersøkelseInfoDto }) {
	if (spørreundersøkelseInfo?.type === "Evaluering") {
		return <EvalueringInfoblokk tema={tema} spørreundersøkelseInfo={spørreundersøkelseInfo} />;

	}
	switch (tema.navn.toLowerCase()) {
		case "partssamarbeid":
			return <Partssamarbeid />;
		case "sykefraværsarbeid":
			return <Sykefraværsarbeid />;
		case "arbeidsmiljø":
			return <Arbeidsmiljø />;
	}
}

function EvalueringInfoblokk({ tema, spørreundersøkelseInfo }: { tema: TemaDto, spørreundersøkelseInfo: SpørreundersøkelseInfoDto }) {
	const planTema = spørreundersøkelseInfo.plan?.temaer.find(t => t.navn.toLowerCase() === tema.navn.toLowerCase());

	if (planTema) {
		return (
			<Box
				borderRadius="xlarge"
				padding="12"
				background="surface-default"
			>
				<PlanGraf undertemaer={planTema.undertemaer} />
			</Box>
		);
	}

	return (
		<Box
			borderRadius="xlarge"
			padding="12"
			background="surface-default"
		>
			Her er det ikke noe enda. Denne siden er ikke ferdigutviklet, men kommer snart :)
		</Box>
	);
}

function Partssamarbeid() {
	return (
		<Box
			borderRadius="xlarge"
			borderColor="border-subtle"
			borderWidth="1"
			padding="10"
			background="surface-action-subtle">
			<List as="ul">
				<ListItem>
					<BodyShort as="span" weight="semibold">Partssamarbeid</BodyShort> er samarbeidet mellom leder, tillitsvalgt og verneombud.
				</ListItem>
				<ListItem>
					Et velfungerende partssamarbeid verdsetter og utnytter hverandres <BodyShort as="span" weight="semibold">kompetanse</BodyShort> og <BodyShort as="span" weight="semibold">ansvarsområder</BodyShort>
				</ListItem>
				<ListItem>
					Samarbeidet er viktig for å oppnå godt <BodyShort as="span" weight="semibold">arbeidsmiljø, lavt sykefravær</BodyShort> og sikre <BodyShort as="span" weight="semibold">høy produktivitet.</BodyShort>
				</ListItem>
			</List>
		</Box>
	);
}

function Sykefraværsarbeid() {
	return (
		<Box
			borderRadius="xlarge"
			padding="10"
			background="surface-success-subtle"
		>
			<b>Sykefraværsarbeid handler blant annet om:</b>
			<List as="ul">
				<ListItem>Kjente og etablerte rutiner for hvordan sykefravær skal følges opp.</ListItem>
				<ListItem>Kultur og kompetanse for tilrettelegging for ansatte.</ListItem>
				<ListItem>At ansatte vet hva som forventes når en er sykmeldt eller står i fare for å bli det.</ListItem>
			</List>
		</Box>
	);
}

function Arbeidsmiljø() {
	return (
		<Box
			borderRadius="xlarge"
			padding="10"
			background="surface-warning-subtle"
		>
			<List as="ul">
				<ListItem>
					Arbeidsmiljø handler om arbeid - det å <BodyShort as="span" weight="semibold">organisere</BodyShort>, <BodyShort as="span" weight="semibold">planlegge</BodyShort> og <BodyShort as="span" weight="semibold">gjennomføre</BodyShort> arbeidet.
				</ListItem>
				<ListItem>Psykologiske og sosiale forhold på arbeidsplassen er viktige faktorer for arbeidsmiljøet.</ListItem>
				<ListItem>Arbeidsmiljø må behandles som ferskvare og krever kontinuerlig, kunnskapsbasert innsats.</ListItem>
			</List>
		</Box>
	);
}