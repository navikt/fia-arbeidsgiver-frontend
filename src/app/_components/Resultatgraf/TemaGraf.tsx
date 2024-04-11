import { temaResultatDTO } from "@/app/_types/resultatDTO";
import Resultatgraf from "@/app/_components/Resultatgraf/index";
import { BodyShort, Box, Heading } from "@navikt/ds-react";
import resultatgrafStyle from "./resultatgraf.module.css";

export default function TemaGraf({ tema }: { tema: temaResultatDTO }) {
  return (
    <Box
      borderRadius="xlarge"
      padding="12"
      background="surface-selected"
      className={resultatgrafStyle.temaboks}
    >
      <div className={resultatgrafStyle.temaheader}>
        <Heading level="2" size="small">
          {tema.beskrivelse}
        </Heading>
        <BodyShort size="large" weight="semibold" style={{ color: "#f00" }}>
          {/* TODO: Fjern denne når vi har ekte data */}
          IKKE EKTE DATA!
        </BodyShort>
      </div>
      {tema.spørsmålMedSvar.map((spørsmål, index) => (
        <Resultatgraf key={index} spørsmål={spørsmål} />
      ))}
    </Box>
  );
}
