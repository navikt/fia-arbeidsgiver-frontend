import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";
import spørsmålStyles from "./sporsmalsside.module.css";
import { HourglassTopFilledIcon } from "@navikt/aksel-icons";

export default function Lastevisning({ sisteTema }: { sisteTema?: string }) {
  switch (sisteTema) {
    case "Partssamarbeid":
      return (
        <Venteskjerm
          boxClassName={spørsmålStyles.blåBoks}
          undertittelClassName={spørsmålStyles.blåVenterundertittel}
        >
          <Heading size="medium" spacing>
            Takk!
          </Heading>
          <BodyShort className={spørsmålStyles.venterPåAtNesteÅpnerTekst}>
            Som deltaker i partssamarbeidet har du en viktig rolle i å skape{" "}
            <strong>godt arbeidsmiljø</strong> og{" "}
            <strong>samarbeid mellom ledelse og ansatte</strong>
          </BodyShort>
        </Venteskjerm>
      );
    case "Sykefraværsarbeid":
      return (
        <Venteskjerm
          boxClassName={spørsmålStyles.grønnBoks}
          undertittelClassName={spørsmålStyles.grønnVenterundertittel}
        >
          <Heading size="medium" spacing>
            Takk!
          </Heading>
          <BodyShort className={spørsmålStyles.venterPåAtNesteÅpnerTekst}>
            Som leder, tillitsvalgt eller verneombud har du en viktig rolle i å{" "}
            <strong>forebygge sykefravær</strong> og{" "}
            <strong>skape gode sykefraværsrutiner</strong>
          </BodyShort>
        </Venteskjerm>
      );
    case "Arbeidsmiljø":
      return (
        <Venteskjerm
          erSiste
          boxClassName={spørsmålStyles.gulBoks}
          undertittelClassName={spørsmålStyles.gulVenterundertittel}
        >
          <Heading size="medium" spacing>
            Takk!
          </Heading>
          <BodyShort className={spørsmålStyles.venterPåAtNesteÅpnerTekst}>
            Din rolle i partssamarbeidet er viktig for å{" "}
            <strong>skape engasjement</strong> og{" "}
            <strong>gode arbeidsforhold</strong> på arbeidsplassen
          </BodyShort>
        </Venteskjerm>
      );
    default:
      return (
        <>
          <VStack gap={"space-16"} align={"center"}>
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

function Venteskjerm({
  children,
  erSiste = false,
  boxClassName,
  undertittelClassName,
}: {
  children: React.ReactNode;
  erSiste?: boolean;
  boxClassName?: string;
  undertittelClassName?: string;
}) {
  return (
    <VStack gap="space-16" align="center" justify="center" height="100%">
      <Box
        background="accent-soft"
        maxWidth="20rem"
        borderRadius="12"
        className={boxClassName}
        padding="space-32"
      >
        {children}
      </Box>
      {erSiste ? (
        <BodyShort
          className={`${spørsmålStyles.venterundertittel} ${undertittelClassName}`}
        >
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
          <BodyShort
            className={`${spørsmålStyles.venterundertittel} ${undertittelClassName}`}
          >
            Neste tema blir snart tilgjengelig.
          </BodyShort>
        </>
      )}
    </VStack>
  );
}
