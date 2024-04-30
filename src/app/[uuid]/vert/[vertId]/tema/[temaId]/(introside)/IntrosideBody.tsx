"use client";

import {
  Accordion,
  Alert,
  Box,
  Button,
  CheckboxGroup,
  Heading,
  Loader,
  RadioGroup,
  VStack,
  Checkbox,
  Radio,
} from "@navikt/ds-react";
import React from "react";
import { useTemaoversiktOverEttTema } from "@/app/_api_hooks/vert/useTemaoversiktOverEttTema";
import { Infoblokk } from "./Infoblokk";
import Headerlinje from "@/app/_components/Headerlinje";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  SpørsmålOgSvaralternativerDTO,
  TemaoversiktDTO,
} from "@/app/_types/TemaoversiktDTO";
import introsideStyles from "./introside.module.css";
import { AccordionContent } from "@navikt/ds-react/Accordion";
import { SvaralternativDTO } from "@/app/_types/SpørsmåloversiktDTO";
import { useÅpneTema } from "@/app/_api_hooks/vert/useÅpneTema";
import LinkTilResultat from "@/app/_components/LinkTilResultat";
import { useRouter } from "next/navigation";
import { StatusPåDeltakerMedSvar } from "@/app/_components/StatusPåDeltaker/StatusPåDeltakerMedSvar";

export function IntrosideBody({
  spørreundersøkelseId,
  vertId,
  temaId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaId: number;
}) {
  const {
    data: temaoversikt,
    isLoading,
    error,
  } = useTemaoversiktOverEttTema(spørreundersøkelseId, vertId, temaId);
  const åpneTema = useÅpneTema(spørreundersøkelseId, vertId, temaId);

  const [erStartet, setErStartet] = React.useState(false);

  if (isLoading) {
    return (
      <VStack gap={"4"} align={"center"} justify={"center"}>
        <Heading size={"large"}>Laster tema</Heading>
        <Loader size="3xlarge" title="Venter..." />
      </VStack>
    );
  }

  if (error) {
    return <Alert variant={"error"}>{error.message}</Alert>;
  }

  return (
    <>
      {temaoversikt && (
        <>
          <Headerlinje tittel={temaoversikt.beskrivelse}>
            {/* TODO: bruk verdi for hele tema, ikke siste spørsmål. */}
            <StatusPåDeltakerMedSvar
              spørreundersøkelseId={spørreundersøkelseId}
              vertId={vertId}
              temaId={temaId}
              spørsmålId={
                temaoversikt.spørsmålOgSvaralternativer[
                  temaoversikt.spørsmålOgSvaralternativer.length - 1
                ].id
              }
            />
            <Actionknapper
              åpneTema={åpneTema}
              setErStartet={setErStartet}
              erStartet={erStartet}
              nesteTemaId={temaoversikt.nesteTemaId}
            />
          </Headerlinje>
          <Infoblokk
            temaoversikt={temaoversikt}
            tittel={temaoversikt.beskrivelse}
            undertittel={temaoversikt.introtekst}
          />
        </>
      )}
      {erStartet && temaoversikt && (
        <SvarRenderer temaoversikt={temaoversikt} />
      )}
    </>
  );
}

function Actionknapper({
  åpneTema,
  setErStartet,
  erStartet,
  nesteTemaId,
}: {
  åpneTema: () => void;
  setErStartet: (erStartet: boolean) => void;
  erStartet: boolean;
  nesteTemaId?: number;
}) {
  const router = useRouter();
  if (!erStartet) {
    return (
      <Button
        onClick={() => {
          åpneTema();
          setErStartet(true);
        }}
        icon={<ArrowRightIcon />}
        iconPosition="right"
      >
        Start
      </Button>
    );
  }

  return (
    <span className={introsideStyles.actionknapper}>
      <LinkTilResultat
        skalViseKnapp
        urlTilResultatside={`../resultater/${nesteTemaId}`}
        gåDirekteTilResultat={false}
        knappetekst={"Vis resultater"}
        variant="primary"
      />
      <Button
        variant="secondary"
        icon={<ArrowRightIcon />}
        iconPosition="right"
        onClick={() => {
          if (nesteTemaId) {
            router.push(`./${nesteTemaId}`);
          } else {
            router.push(`../oversikt`);
          }
        }}
      >
        {nesteTemaId ? "Gå til neste tema" : "Gå til oversikt"}
      </Button>
    </span>
  );
}

function SvarRenderer({ temaoversikt }: { temaoversikt: TemaoversiktDTO }) {
  return (
    <>
      <Box
        borderRadius="xlarge"
        padding="12"
        background="surface-default"
        className={introsideStyles.spørsmålsseksjon}
      >
        <Accordion>
          {temaoversikt.spørsmålOgSvaralternativer.map((spørsmål, index) => (
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
  spørsmål: SpørsmålOgSvaralternativerDTO;
  index: number;
}) {
  return (
    <Accordion.Item>
      <Accordion.Header
        className={`${index === 0 ? introsideStyles.førstespørsmåltittel : ""} ${introsideStyles.spørsmåltittel}`}
      >
        {spørsmål.spørsmål}
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
  svaralternativer: SvaralternativDTO[];
  flervalg: boolean;
}) {
  const OptionGroup = flervalg ? CheckboxGroup : RadioGroup;
  const Option = flervalg ? Checkbox : Radio;

  return (
    <OptionGroup hideLegend legend={""}>
      {svaralternativer.map((svaralternativ) => (
        <Option
          key={svaralternativ.svarId}
          value={svaralternativ.svarId}
          className={introsideStyles.disabletOption}
        >
          {svaralternativ.svartekst}
        </Option>
      ))}
    </OptionGroup>
  );
}
