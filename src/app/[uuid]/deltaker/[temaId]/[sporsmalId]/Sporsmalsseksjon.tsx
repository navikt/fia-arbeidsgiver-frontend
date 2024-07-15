"use client";

import React from "react";
import spørsmålStyles from "./sporsmalsside.module.css";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  HStack,
  Radio,
  RadioGroup,
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
  spørsmåloversikt,
}: {
  spørsmålId: string;
  spørreundersøkelseId: string;
  temaId: number;
  spørsmåloversikt: DeltakerSpørsmålDto;
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
      router.push(urlNeste(spørsmåloversikt));
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
          router.push(urlNeste(spørsmåloversikt));
        })
        .catch((error) => {
          if (error.message == "Tema stengt, hent nytt spørsmål") {
            fetchIdentifiserbartSpørsmål(spørreundersøkelseId)
              .then(({ spørsmålId, temaId }) => {
                router.push(`../../deltaker/${temaId}/${spørsmålId}`);
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
    const url = urlTilbake(spørsmåloversikt);
    if (url !== null) {
      router.push(url);
    }
  };

  return (
    <>
      <Box
        borderRadius="xlarge"
        padding="5"
        className={spørsmålStyles.innholdboks}
      >
        <VStack className={spørsmålStyles.radioStack}>
          {spørsmåloversikt.spørsmål.flervalg ? (
            <CheckboxGroup
              onChange={velgSvar}
              legend={
                <>
                  {spørsmåloversikt.spørsmål.tekst}
                  <br />
                  <span className={spørsmålStyles.normaltekst}>
                    (flere valg er mulig)
                  </span>
                </>
              }
              value={svar}
              error={feilSendSvar}
            >
              {spørsmåloversikt.spørsmål.svaralternativer.map(
                (svaralternativ) => (
                  <Checkbox key={svaralternativ.id} value={svaralternativ.id}>
                    {svaralternativ.tekst}
                  </Checkbox>
                ),
              )}
            </CheckboxGroup>
          ) : (
            <RadioGroup
              legend={spørsmåloversikt.spørsmål.tekst}
              onChange={(value) => velgSvar([value])}
              value={svar[0] || null}
              className={spørsmålStyles.spørsmålsseksjon}
              error={feilSendSvar}
            >
              {spørsmåloversikt.spørsmål.svaralternativer.map(
                (svaralternativ) => (
                  <Radio key={svaralternativ.id} value={svaralternativ.id}>
                    {svaralternativ.tekst}
                  </Radio>
                ),
              )}
            </RadioGroup>
          )}
        </VStack>
      </Box>
      <HStack justify={"end"} gap={"2"} className={spørsmålStyles.knappeStack}>
        {spørsmåloversikt.forrigeSpørsmål !== null ? (
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
