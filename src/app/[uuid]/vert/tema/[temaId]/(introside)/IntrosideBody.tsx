"use client";

import {
  Accordion,
  Alert,
  BodyShort,
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
import { useSpørreundersøkelseInfo } from "@/app/_api_hooks/vert/useSpørreundersøkelseInfo";

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
  const åpneTema = useÅpneTema(spørreundersøkelseId, temaId);
  const { data: spørreundersøkelseInfo, isLoading: lasterInfo, error: infoError } = useSpørreundersøkelseInfo(spørreundersøkelseId);
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

  React.useEffect(() => {
    if (spørreundersøkelseInfo?.type === "Evaluering" && !erStartet && tema?.status !== TemaStatus.ALLE_SPØRSMÅL_ÅPNET) {
      åpneTema().catch((error) => {
        setÅpneTemaError(error.message);
      });
      setErStartet(true);
    }
  }, [spørreundersøkelseInfo, erStartet, tema, åpneTema]);

  const [åpneTemaError, setÅpneTemaError] = React.useState<string | null>(null);

  if (isLoading || lasterInfo) {
    return (
      <VStack gap={"4"} align={"center"} justify={"center"}>
        <Heading size={"large"}>Laster tema</Heading>
        <Loader size="3xlarge" title="Venter..." />
      </VStack>
    );
  }

  if (error || åpneTemaError || infoError) {
    return (
      <Alert variant={"error"} role="alert" aria-live="polite">
        {error?.message}
        {åpneTemaError}
        {infoError?.message}
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
          <Infoblokk tema={tema} spørreundersøkelseInfo={spørreundersøkelseInfo} />
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
        knappetekst={tema.status === "STENGT" ? "Vis resultatene" : "Fullfør og vis resultatene"}
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

  const erGruppert = tema.spørsmål.some((spørsmål) => spørsmål.kategori);

  return (
    <Box
      borderRadius="xlarge"
      padding="12"
      background="surface-default"
      className={introsideStyles.spørsmålsseksjon}
      ref={boxRef}
    >
      {erGruppert ? <GruppertSpørsmålRenderer tema={tema} /> : <UgruppertSpørsmålRenderer tema={tema} />}
    </Box>
  );
}

function UgruppertSpørsmålRenderer({ tema }: { tema: TemaDto }) {
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
    <Accordion className={introsideStyles.spørsmålsAccordion}>
      {tema.spørsmål.map((spørsmål, index) => (
        <SpørsmålAccordion key={index} spørsmål={spørsmål} index={index} />
      ))}
    </Accordion>
  );
}

function GruppertSpørsmålRenderer({ tema }: { tema: TemaDto }) {
  const grupperteSpørsmål = tema.spørsmål.reduce((acc, spørsmål) => {
    if (spørsmål.kategori) {
      acc[spørsmål.kategori] = acc[spørsmål.kategori] || [];
      acc[spørsmål.kategori].push(spørsmål);
    } else {
      acc["Uten gruppe"] = acc["Uten gruppe"] || [];
      acc["Uten gruppe"].push(spørsmål);
    }
    return acc;
  }, {} as { [key: string]: SpørsmålDto[] });

  return (
    <>
      {Object.entries(grupperteSpørsmål).map(([kategori, spørsmål]) => (
        <React.Fragment key={kategori}>
          <Kategori tittel={kategori} />
          <UgruppertSpørsmålRenderer tema={{ ...tema, spørsmål: spørsmål }} />
        </React.Fragment>
      ))}
    </>
  );
}

const KATEGORI_BESKRIVELSER: { [key: string]: string } = {
  //Arbeidsmiljø
  "Utvikle arbeidsmiljøet": "Mål: Øke anvendelse og kompetanse innen verktøy og bransjerettet kunnskap for å jobbe målrettet og kunnskapsbasert med eget arbeidsmiljø.",
  "Endring og omstilling": "Mål: Øke kunnskap om hvordan ivareta arbeidsmiljø og forebygge sykefravær under endring og omstilling.",
  "Oppfølging av arbeidsmiljøundersøkelser": "Mål: Øke ferdigheter og gi støtte til hvordan man kan jobbe med forhold på arbeidsplassen som belyses i egne arbeidsmiljøundersøkelser.",
  "Livsfaseorientert personalpolitikk": "Mål: Utvikle kultur og personalpolitikk som ivaretar medarbeideres ulike behov, krav, begrensninger og muligheter i ulike livsfaser.",
  "Psykisk helse": "Mål: Gi innsikt i hvordan psykiske utfordringer kan komme til uttrykk i arbeidshverdagen og øke ferdigheter for hvordan man møter medarbeidere med psykiske helseutfordringer.",
  "HelseIArbeid": "Mål: Øke kompetansen og få ansatte til å mestre jobb, selv med muskel/skjelett- og psykiske helseplager.",
  //Sykefraværsarbeid
  "Sykefraværsrutiner": "Mål: Jobbe systematisk og forebyggende med sykefravær, samt forbedre rutiner og oppfølging av ansatte som er sykmeldte eller står i fare for å bli det.",
  "Oppfølgingssamtaler": "Mål:  Øke kompetanse og ferdigheter for hvordan man gjennomfører gode oppfølgingssamtaler, både gjennom teori og praksis.",
  "Tilretteleggings- og medvirkningsplikt": "Mål: Utvikle rutiner og kultur for tilrettelegging og medvirkning, samt kartlegging av tilretteleggingsmuligheter på arbeidsplassen.",
  "Sykefravær - enkeltsaker": "Mål: Øke kompetanse og ferdigheter for hvordan man tar tak i, følger opp og løser enkeltsaker.",
  //Partssamarbeid
  "Utvikle partssamarbeidet": "Mål: Styrke og strukturere samarbeidet mellom leder, tillitsvalgt og verneombud, samt øke kunnskap og ferdigheter for å jobbe systematisk og forebyggende med sykefravær og arbeidsmiljø.",
}

function Kategori({ tittel }: { tittel: string }) {
  if (KATEGORI_BESKRIVELSER[tittel]) {
    return (
      <div className={introsideStyles.kategoriHeader}>
        <Heading level="4" size="xsmall" className={introsideStyles.kategoriTittel}>{tittel}</Heading>
        <BodyShort size="small" className={introsideStyles.kategoriMål}>
          {KATEGORI_BESKRIVELSER[tittel]}
        </BodyShort>
      </div>
    );
  }

  if (tittel === "Uten gruppe") {
    return null;
  }

  return (
    <div className={introsideStyles.kategoriHeader}>
      <Heading level="4" size="xsmall" className={introsideStyles.kategoriTittel}>{tittel}</Heading>
    </div>
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
    <Accordion.Item className={introsideStyles.accordionItem}>
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
