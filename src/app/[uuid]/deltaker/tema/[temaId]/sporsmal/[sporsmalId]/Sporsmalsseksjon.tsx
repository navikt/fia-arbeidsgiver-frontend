"use client";

import React from "react";
import spørsmålStyles from "./sporsmalsside.module.css";
import {
  BodyShort,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  HStack,
  Radio,
  RadioGroup,
  Skeleton,
  VStack,
} from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { sendSvar } from "@/app/_api_hooks/deltaker/sendSvar";
import { DeltakerSpørsmålDto } from "@/app/_types/DeltakerSpørsmålDto";
import CookieHandler from "@/utils/CookieHandler";
import { urlNeste, urlTilbake } from "@/utils/spørreundersøkelsesUtils";
import { fetchIdentifiserbartSpørsmål } from "@/app/_api_hooks/deltaker/fetchIdentifiserbartSpørsmål";
import { ArrowRightIcon } from "@navikt/aksel-icons";

export default function Spørsmålsseksjon({
  spørsmålId,
  spørreundersøkelseId,
  temaId,
  deltakerSpørsmål,
}: {
  spørsmålId: string;
  spørreundersøkelseId: string;
  temaId: number;
  deltakerSpørsmål: DeltakerSpørsmålDto;
}) {
  const lagretSvar = CookieHandler.getSvarPåSpørsmål(spørsmålId);
  const [feilSendSvar, setFeilSendSvar] = React.useState<string | null>(null);

  const [svar, setSvar] = React.useState(lagretSvar || []);
  const velgSvar = (svaralternativider: string[]) =>
    setSvar(svaralternativider);
  const erPåLagretSvar = (
    valgtSvar: string[],
    lagretSvar: string[] | undefined,
  ) => {
    if (lagretSvar === undefined) return false;
    return (
      valgtSvar.toString() === lagretSvar.toString() && lagretSvar?.length > 0
    );
  };

  const router = useRouter();

  const håndterNesteknapp = () => {
    if (erPåLagretSvar(svar, lagretSvar)) {
      router.push(urlNeste(deltakerSpørsmål));
    } else {
      if (svar.length === 0) {
        setFeilSendSvar("Velg minst ett svar");
        return;
      }

      sendSvar({
        spørreundersøkelseId: spørreundersøkelseId,
        temaId: temaId,
        spørsmålId: spørsmålId,
        svarIder: svar,
      })
        .then(() => {
          setFeilSendSvar(null);
          router.push(urlNeste(deltakerSpørsmål));
        })
        .catch((error) => {
          if (error.message == "Tema stengt, hent nytt spørsmål") {
            fetchIdentifiserbartSpørsmål(spørreundersøkelseId)
              .then(({ spørsmålId, temaId }) => {
                router.push(
                  `../../deltaker/tema/${temaId}/sporsmal/${spørsmålId}`,
                );
              })
              .catch((error) => {
                setFeilSendSvar(error.message);
              });
          } else {
            setFeilSendSvar(error.message);
          }
        });
    }
  };

  const håndterTilbakeknapp = () => {
    const url = urlTilbake(deltakerSpørsmål);
    if (url !== null) {
      router.push(url);
    }
  };

  return (
    <>
      <Box
        borderRadius="xlarge"
        padding="5"
        className={`${spørsmålBoksFargeClassname(deltakerSpørsmål.temanavn)} ${spørsmålStyles.innholdboks} `}
      >
        {deltakerSpørsmål.type.toLowerCase() === "evaluering" ? (
          <Kategoritittel tittel={deltakerSpørsmål.spørsmål.kategori} />
        ) : null}
        {deltakerSpørsmål.spørsmål.flervalg ? (
          <CheckboxGroup
            onChange={velgSvar}
            legend={
              <>
                {deltakerSpørsmål.spørsmål.tekst}
                <br />
                <span className={spørsmålStyles.normaltekst}>
                  (flere valg er mulig)
                </span>
              </>
            }
            className={spørsmålStyles.spørsmålsseksjon}
            value={svar}
            error={feilSendSvar && <div aria-live="assertive" role="alert">{feilSendSvar}</div>}
          >
            {deltakerSpørsmål.spørsmål.svaralternativer.map(
              (svaralternativ) => (
                <Checkbox key={svaralternativ.id} value={svaralternativ.id}>
                  {svaralternativ.tekst}
                </Checkbox>
              ),
            )}
          </CheckboxGroup>
        ) : (
          <RadioGroup
            legend={deltakerSpørsmål.spørsmål.tekst}
            onChange={(value) => velgSvar([value])}
            value={svar[0] || null}
            className={spørsmålStyles.spørsmålsseksjon}
            error={feilSendSvar && <div aria-live="assertive" role="alert">{feilSendSvar}</div>}
          >
            {deltakerSpørsmål.spørsmål.svaralternativer.map(
              (svaralternativ) => (
                <Radio key={svaralternativ.id} value={svaralternativ.id}>
                  {svaralternativ.tekst}
                </Radio>
              ),
            )}
          </RadioGroup>
        )}
      </Box>
      <HStack justify={"end"} gap={"2"} className={spørsmålStyles.knappeStack}>
        {deltakerSpørsmål.spørsmålnummer > 1 ? (
          <Button
            variant="secondary"
            className={spørsmålStyles.tilbakeknapp}
            onClick={håndterTilbakeknapp}
          >
            Tilbake
          </Button>
        ) : null}
        <Button
          variant="primary"
          className={spørsmålStyles.nesteknapp}
          onClick={håndterNesteknapp}
          iconPosition="right"
          icon={<ArrowRightIcon aria-hidden />}
        >
          <SvarKnappTekst
            erPåLagretSvar={erPåLagretSvar(svar, lagretSvar)}
            lagretSvar={lagretSvar}
          />
        </Button>
      </HStack>
    </>
  );
}

export function SpørsmålsseksjonSkeleton({
  sisteTema,
}: {
  sisteTema?: string;
}) {
  return (
    <>
      <Box
        borderRadius="xlarge"
        padding="5"
        className={`${spørsmålBoksFargeClassname(sisteTema || "")} ${spørsmålStyles.innholdboks} `}
      >
        <BodyShort size="small" as={Skeleton}>
          Undertema
        </BodyShort>
        {/* Kategoritittel */}
        <VStack gap="3">
          {/* CheckboxGroup */}
          <Skeleton width="100%" height="5rem" />
          {/* Spørsmålstekst */}
          <CheckboxSkeleton width="6rem" />
          <CheckboxSkeleton width="5.5rem" />
          <CheckboxSkeleton width="6.25rem" />
          <CheckboxSkeleton width="6.5rem" />
          <CheckboxSkeleton width="5rem" />
        </VStack>
      </Box>
      <HStack justify={"end"} gap={"2"} className={spørsmålStyles.knappeStack}>
        <Skeleton variant="rounded" height="3rem" width="7.5rem" />
        {/* Knapp */}
      </HStack>
    </>
  );
}

function CheckboxSkeleton({ width = "12rem" }: { width?: string }) {
  return (
    <HStack align="center" gap="3">
      <Skeleton variant="circle" width="1.5rem" height="1.5rem" />
      <Skeleton width={width} height="2rem" />
    </HStack>
  );
}

function Kategoritittel({ tittel }: { tittel?: string }) {
  if (tittel === "" || tittel === undefined) {
    return null;
  }

  return (
    <BodyShort size="small" className={spørsmålStyles.kategoritittel}>
      {tittel}
    </BodyShort>
  );
}

function spørsmålBoksFargeClassname(temanavn: string) {
  switch (temanavn) {
    case "Partssamarbeid":
      return spørsmålStyles.blå;
    case "Sykefraværsarbeid":
      return spørsmålStyles.grønn;
    case "Arbeidsmiljø":
      return spørsmålStyles.gul;
    default:
      return "";
  }
}

function SvarKnappTekst({
  erPåLagretSvar,
  lagretSvar,
}: {
  erPåLagretSvar: boolean;
  lagretSvar?: string[];
}) {
  if (erPåLagretSvar) {
    return "Neste";
  } else if (lagretSvar) {
    return "Endre svar";
  }
  return "Svar";
}
