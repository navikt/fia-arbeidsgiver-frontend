"use client";

import {
  Accordion,
  Alert,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Heading,
  Loader,
  Radio,
  RadioGroup,
  VStack,
} from "@navikt/ds-react";
import React from "react";
import { useTemaoversikt } from "@/app/_api_hooks/vert/useTemaoversikt";
import Infoblokk from "./Infoblokk";
import Headerlinje from "@/app/_components/Headerlinje";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { TemaDto } from "@/app/_types/TemaDto";
import introsideStyles from "./introside.module.css";
import kartleggingStyles from "../../../../../kartlegging.module.css";
import { AccordionContent } from "@navikt/ds-react/Accordion";
import { useÅpneTema } from "@/app/_api_hooks/vert/useÅpneTema";
import LinkTilResultat from "@/app/_components/LinkTilResultat";
import { useRouter } from "next/navigation";
import { StatusPåDeltakerMedSvar } from "@/app/_components/StatusPåDeltaker/StatusPåDeltakerMedSvar";
import { SpørsmålDto } from "@/app/_types/SpørsmålDto";
import { SvaralternativDto } from "@/app/_types/SvaralternativDto";
import { TemaStatus } from "@/app/_types/TemaStatus";

export function IntrosideBody({
  spørreundersøkelseId,
  temaId,
}: {
  spørreundersøkelseId: string;
  temaId: number;
}) {
  const {
    data: tema,
    isLoading,
    error,
  } = useTemaoversikt(spørreundersøkelseId, temaId);
  const [erStartet, setErStartet] = React.useState(false);

  React.useEffect(() => {
    if (
      !erStartet &&
      (tema?.status === TemaStatus.ALLE_SPØRSMÅL_ÅPNET ||
        tema?.status === TemaStatus.STENGT)
    ) {
      setErStartet(true);
    }
  }, [tema, erStartet]);
  const åpneTema = useÅpneTema(spørreundersøkelseId, temaId);

  const [åpneTemaError, setÅpneTemaError] = React.useState<string | null>(null);

  if (isLoading) {
    return (
      <VStack gap={"4"} align={"center"} justify={"center"}>
        <Heading size={"large"}>Laster tema</Heading>
        <Loader size="3xlarge" title="Venter..." />
      </VStack>
    );
  }

  if (error || åpneTemaError) {
    return (
      <Alert variant={"error"} role="alert" aria-live="polite">
        {error?.message}
        {åpneTemaError}
      </Alert>
    );
  }

  return (
    <>
      {tema && (
        <>
          <Headerlinje tittel={tema.navn}>
            <Actionknapper
              tema={tema}
              åpneTema={åpneTema}
              setÅpneTemaError={setÅpneTemaError}
              setErStartet={setErStartet}
              erStartet={erStartet}
              spørreundersøkelseId={spørreundersøkelseId}
              temaId={temaId}
            />
          </Headerlinje>
          <Infoblokk tema={tema} />
        </>
      )}
      {erStartet && tema && <SvarRenderer tema={tema} />}
    </>
  );
}

function Actionknapper({
  åpneTema,
  setÅpneTemaError,
  setErStartet,
  erStartet,
  tema,
  spørreundersøkelseId,
  temaId,
}: {
  åpneTema: () => Promise<void>;
  setÅpneTemaError: (error: string) => void;
  setErStartet: (erStartet: boolean) => void;
  erStartet: boolean;
  tema: TemaDto;
  spørreundersøkelseId: string;
  temaId: number;
}) {
  const router = useRouter();
  if (!erStartet) {
    return (
      <Button
        onClick={() => {
          åpneTema().catch((error) => {
            setÅpneTemaError(error.message);
          });
          setErStartet(true);
        }}
        icon={<ArrowRightIcon aria-hidden />}
        iconPosition="right"
      >
        Start
      </Button>
    );
  }

  return (
    <span className={introsideStyles.actionknapper}>
      <StatusPåDeltakerMedSvar
        spørreundersøkelseId={spørreundersøkelseId}
        temaId={temaId}
      />
      <LinkTilResultat
        spørreundersøkelseId={spørreundersøkelseId}
        temaId={temaId}
        skalViseKnapp
        urlTilResultatside={`../resultater/${temaId}`}
        gåDirekteTilResultat={false}
        knappetekst={tema.status === "STENGT" ? "Vis resultater" : "Fullfør og vis resultater"}
        modalTittel={"Vil du fullføre temaet?"}
        variant="primary"
        knappeClass={introsideStyles.resultatknapp}
      />
      <Button
        variant="secondary"
        icon={<ArrowRightIcon aria-hidden />}
        iconPosition="right"
        className={kartleggingStyles.knappHvit}
        onClick={() => {
          if (tema.nesteTemaId) {
            router.push(`./${tema.nesteTemaId}`);
          } else {
            router.push(`../oversikt`);
          }
        }}
      >
        {tema.nesteTemaId ? "Gå til neste tema" : "Gå til oversikt"}
      </Button>
    </span>
  );
}

function SvarRenderer({ tema }: { tema: TemaDto }) {
  const boxRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (boxRef !== null) {
      boxRef?.current?.scrollIntoView({
        block: 'end',
        inline: 'center',
      });
    }
  }, []);

  return (
    <>
      <Box
        borderRadius="xlarge"
        padding="12"
        background="surface-default"
        className={introsideStyles.spørsmålsseksjon}
        ref={boxRef}
      >
        <Accordion>
          {tema.spørsmål.map((spørsmål, index) => (
            <SpørsmålAccordion key={index} spørsmål={spørsmål} index={index} />
          ))}
        </Accordion>
      </Box>
    </>
  );
}

function SpørsmålAccordion({
  spørsmål,
  index,
}: {
  spørsmål: SpørsmålDto;
  index: number;
}) {
  return (
    <Accordion.Item>
      <Accordion.Header
        className={`${index === 0 ? introsideStyles.førstespørsmåltittel : ""} ${introsideStyles.spørsmåltittel}`}
      >
        {spørsmål.tekst}
      </Accordion.Header>
      <AccordionContent>
        <Svaralternativer
          svaralternativer={spørsmål.svaralternativer}
          flervalg={spørsmål.flervalg}
        />
      </AccordionContent>
    </Accordion.Item>
  );
}

function Svaralternativer({
  svaralternativer,
  flervalg,
}: {
  svaralternativer: SvaralternativDto[];
  flervalg: boolean;
}) {
  const OptionGroup = flervalg ? CheckboxGroup : RadioGroup;
  const Option = flervalg ? Checkbox : Radio;

  return (
    <OptionGroup hideLegend legend={""}>
      {svaralternativer.map((svaralternativ) => (
        <Option
          key={svaralternativ.id}
          value={svaralternativ.id}
          className={introsideStyles.disabletOption}
        >
          {svaralternativ.tekst}
        </Option>
      ))}
    </OptionGroup>
  );
}
