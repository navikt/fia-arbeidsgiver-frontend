import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";
import spørsmålStyles from "./sporsmalsside.module.css"
import { HourglassTopFilledIcon } from "@navikt/aksel-icons";

export default function Lastevisning({ sisteTema }: { sisteTema?: string }) {
	switch (sisteTema) {
		case "Partssamarbeid":
			return (
				<Venteskjerm boxClassName={spørsmålStyles.blåBoks} undertittelClassName={spørsmålStyles.blåVenterundertittel}>
					<Heading size="medium" spacing>Takk!</Heading>
					<BodyShort>
						<i>
							Som deltaker i partssamarbeidet har du en viktig rolle i å skape <b>godt arbeidsmiljø</b> og <b>samarbeid mellom ledelse og ansatte</b>
						</i>
					</BodyShort>
				</Venteskjerm>
			);
		case "Sykefraværsarbeid":
			return (
				<Venteskjerm boxClassName={spørsmålStyles.grønnBoks} undertittelClassName={spørsmålStyles.grønnVenterundertittel}>
					<Heading size="medium" spacing>Takk!</Heading>
					<BodyShort>
						<i>
							Som leder, tillitsvalgt eller verneombud har du en viktig rolle i å <b>forebygge sykefravær</b> og <b>skape gode sykefraværsrutiner</b>
						</i>
					</BodyShort>
				</Venteskjerm>
			);
		case "Arbeidsmiljø":
			return (
				<Venteskjerm erSiste boxClassName={spørsmålStyles.gulBoks} undertittelClassName={spørsmålStyles.gulVenterundertittel}>
					<Heading size="medium" spacing>Takk!</Heading>
					<BodyShort>
						<i>
							Din rolle i partssamarbeidet er viktig for å <b>skape engasjement</b> og <b>gode arbeidsforhold</b> på arbeidsplassen
						</i>
					</BodyShort>
				</Venteskjerm>
			);
		default:
			return (
				<>
					<VStack gap={"4"} align={"center"}>
						<Heading
							level="1"
							size="medium"
							className={spørsmålStyles.ventertittel}
							align="center"
						>
							Vennligst vent...
						</Heading>
						<HourglassTopFilledIcon
							className={spørsmålStyles.venterTimeglass}
							title="Venter"
							fontSize="5rem"
						/>
						<BodyShort className={spørsmålStyles.venterundertittel}>
							Spørsmål blir snart tilgjengelig.
						</BodyShort>
					</VStack>
				</>
			);
	}
}

function Venteskjerm(
	{ children, erSiste = false, boxClassName, undertittelClassName }:
		{ children: React.ReactNode, erSiste?: boolean, boxClassName?: string, undertittelClassName?: string }
) {
	return (
		<VStack gap="4" align="center" justify="center" height="100%">
			<Box
				background="surface-selected"
				maxWidth="20rem"
				borderRadius="xlarge"
				className={boxClassName}
				padding="8">
				{children}
			</Box>
			{
				erSiste ? (
					<BodyShort className={`${spørsmålStyles.venterundertittel} ${undertittelClassName}`}>
						Takk for din deltakelse,
						<br />
						du kan nå lukke denne siden.
					</BodyShort>
				) : (
					<>
						<HourglassTopFilledIcon
							className={spørsmålStyles.venterTimeglass}
							title="Venter"
							fontSize="5rem"
						/>
						<BodyShort className={`${spørsmålStyles.venterundertittel} ${undertittelClassName}`}>
							Neste tema blir snart tilgjengelig.
						</BodyShort>
					</>
				)
			}
		</VStack>
	);
}