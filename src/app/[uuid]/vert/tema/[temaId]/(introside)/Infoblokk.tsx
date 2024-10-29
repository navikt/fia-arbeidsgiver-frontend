import { TemaDto } from "@/app/_types/TemaDto";
import introsideStyles from "./introside.module.css";
import React, { ComponentProps } from "react";
import { BodyLong, BodyShort, Box, HStack, List } from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";

export default function Infoblokk({ tema }: { tema: TemaDto }) {
	switch (tema.navn.toLowerCase()) {
		case "partssamarbeid":
			return <Partssamarbeid />;
		case "sykefraværsarbeid":
			return <Sykefraværsarbeid />;
		case "arbeidsmiljø":
			return <Arbeidsmiljø />;
	}
}

function InfoBlokkInnhold({
	children,
	farge,
	tekstfarge,
	punktliste,
}: {
	children: React.ReactNode,
	farge: ComponentProps<typeof Box>["background"],
	tekstfarge: string,
	punktliste: React.ReactNode
}) {
	return (
		<Box borderRadius="xlarge" padding="12" background="surface-default">
			<HStack align="center" gap="4" justify="space-between">
				<span className={introsideStyles.venstreDel}>
					{children}
				</span>
				<span className={introsideStyles.høyreDel}>
					<Box
						borderRadius="xlarge"
						padding="10"
						background={farge}
					>
						<BodyLong
							style={{ color: `var(--${tekstfarge})` }}
						>
							{punktliste}
						</BodyLong>
					</Box>
				</span>
			</HStack>
		</Box>
	)
}

function Partssamarbeid() {
	return (
		<InfoBlokkInnhold
			farge="surface-action-subtle"
			tekstfarge="a-text-action"
			punktliste={
				<>
					Som deltaker i partssamarbeidet har du en viktig rolle i å skape <BodyShort as="span" weight="semibold">godt arbeidsmiljø</BodyShort> og <BodyShort as="span" weight="semibold">samarbeid mellom ledelse og ansatte</BodyShort>
				</>
			}
		>
			<List as="ul">
				<ListItem>
					NAV er opptatt av det <BodyShort as="span" weight="semibold">utvidede partssamarbeidet.</BodyShort> Det betyr samarbeid mellom ledere, tillitsvalgte og verneombud for å utvikle og forbedre arbeidsplassen.
				</ListItem>
				<ListItem>
					Et velfungerende partssamarbeid verdsetter og utnytter partenes <BodyShort as="span" weight="semibold">kompetanse</BodyShort> og <BodyShort as="span" weight="semibold">ansvarsområder.</BodyShort>
				</ListItem>
				<ListItem>
					Samarbeidet er viktig for å oppnå et <BodyShort as="span" weight="semibold">godt arbeidsmiljø</BodyShort>, <BodyShort as="span" weight="semibold">lavt sykefravær</BodyShort> og sikre <BodyShort as="span" weight="semibold">høy produktivitet.</BodyShort>
				</ListItem>
			</List>
		</InfoBlokkInnhold>
	);
}

function Sykefraværsarbeid() {
	return (
		<InfoBlokkInnhold
			farge="surface-success-subtle"
			tekstfarge="a-text-success"
			punktliste={
				<>
					Som leder, tillitsvalgt eller verneombud har du en viktig rolle i å <BodyShort as="span" weight="semibold">forebygge sykefravær</BodyShort> og <BodyShort as="span" weight="semibold">skape gode sykefraværsrutiner</BodyShort>
				</>
			}
		>
			<b>Sykefraværsarbeid handler blant annet om:</b>
			<List as="ul">
				<ListItem>Kjente og etablerte rutiner for hvordan sykefravær skal følges opp.</ListItem>
				<ListItem>Kultur og kompetanse for tilrettelegging for ansatte.</ListItem>
				<ListItem>At ansatte vet hva som forventes når en er sykmeldt eller står i fare for å bli det.</ListItem>
			</List>
		</InfoBlokkInnhold>
	);
}

function Arbeidsmiljø() {
	return (
		<InfoBlokkInnhold
			farge="surface-warning-subtle"
			tekstfarge="a-text-warning"
			punktliste={
				<>
					Din rolle i partssamarbeidet er viktig for å <BodyShort as="span" weight="semibold">skape engasjement</BodyShort> og <BodyShort as="span" weight="semibold">gode arbeidsforhold</BodyShort> på arbeidsplassen
				</>
			}
		>
			<List as="ul">
				<ListItem>
					Arbeidsmiljø handler om arbeid - det å <BodyShort as="span" weight="semibold">organisere</BodyShort>, <BodyShort as="span" weight="semibold">planlegge</BodyShort> og <BodyShort as="span" weight="semibold">gjennomføre</BodyShort> arbeidet.
				</ListItem>
				<ListItem>Psykologiske og sosiale forhold på arbeidsplassen er viktige faktorer for arbeidsmiljøet.</ListItem>
				<ListItem>Arbeidsmiljø må behandles som ferskvare og krever kontinuerlig, kunnskapsbasert innsats.</ListItem>
			</List>
		</InfoBlokkInnhold>
	);
}