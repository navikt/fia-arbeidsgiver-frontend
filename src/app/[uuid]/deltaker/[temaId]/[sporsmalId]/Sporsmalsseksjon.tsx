"use client";

import React from "react";
import spørsmålStyles from "./sporsmalsside.module.css";
import {
  Alert,
  BodyShort,
  Button,
  Radio,
  RadioGroup,
  VStack,
} from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { sendSvar } from "@/app/_api_hooks/deltaker/sendSvar";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";
import CookieHandler from "@/utils/CookieHandler";
import { Tema } from "@/app/_types/tema";
import { temaTilURL } from "@/utils/spørreundersøkelsesUtils";

export default function Spørsmålsseksjon({
  spørsmålId,
  spørreundersøkelseId,
  tema,
  spørsmålOgSvar,
}: {
  spørsmålId: string;
  spørreundersøkelseId: string;
  tema: Tema;
  spørsmålOgSvar: SpørsmålsoversiktDto;
}) {
  const lagretSvar = CookieHandler.getSvarPåSpørsmål(spørsmålId);
  const [feilSendSvar, setFeilSendSvar] = React.useState<string | null>(null);

  const router = useRouter();

  const [svar, setSvar] = React.useState(lagretSvar || "");
  const velgSvar = (svaralternativid: string) => setSvar(svaralternativid);

  const erPåLagretSvar = svar === lagretSvar && lagretSvar?.length > 0;

  const navigerNeste = () => {
    if (!spørsmålOgSvar) {
      throw new Error("Spørsmål mangler");
    }

    if (spørsmålOgSvar.nesteSpørsmål === null) {
      router.push(`../ferdig`);
      return;
    }

    if (spørsmålOgSvar.nesteSpørsmål.temaId !== tema) {
      router.push(
        `../${temaTilURL(spørsmålOgSvar.nesteSpørsmål.temaId)}/${
          spørsmålOgSvar.nesteSpørsmål.spørsmålId
        }`,
      );
    } else {
      router.push(`./${spørsmålOgSvar.nesteSpørsmål.spørsmålId}`);
    }
  };
  const navigerTilbake = () => {
    if (!spørsmålOgSvar) {
      throw new Error("Spørsmål mangler");
    }

    if (spørsmålOgSvar.forrigeSpørsmål === null) {
      return; // Kan ikke gå tilbake, så her gjør vi ingenting
    }

    if (spørsmålOgSvar.forrigeSpørsmål.temaId !== tema) {
      router.push(
        `../${temaTilURL(spørsmålOgSvar.forrigeSpørsmål.temaId)}/${
          spørsmålOgSvar.forrigeSpørsmål.spørsmålId
        }`,
      );
    } else {
      router.push(`./${spørsmålOgSvar.forrigeSpørsmål.spørsmålId}`);
    }
  };

  const håndterNesteknapp = () => {
    if (!spørsmålOgSvar) {
      throw new Error("Spørsmål mangler");
    }

    if (erPåLagretSvar) {
      navigerNeste();
    } else {
      sendSvar({
        spørreundersøkelseId: spørreundersøkelseId,
        tema: tema,
        spørsmålId: spørsmålId,
        svarId: svar,
      })
        .then(() => {
          setFeilSendSvar(null);
          navigerNeste();
        })
        .catch((error) => {
          setFeilSendSvar(error.message);
        });
    }
  };

  return (
    <>
      <BodyShort weight={"semibold"}>{spørsmålOgSvar.spørsmålTekst}</BodyShort>
      <VStack className={spørsmålStyles.radioStack}>
        <RadioGroup
          legend="Velg ett alternativ"
          onChange={velgSvar}
          value={svar}
          hideLegend
          className={spørsmålStyles.spørsmålsseksjon}
        >
          {spørsmålOgSvar.svaralternativer.map((svaralternativ) => (
            <Radio key={svaralternativ.svarId} value={svaralternativ.svarId}>
              {svaralternativ.svartekst}
            </Radio>
          ))}
        </RadioGroup>
        {feilSendSvar !== null ? (
          <Alert
            variant="error"
            closeButton
            onClose={() => setFeilSendSvar(null)}
          >
            {feilSendSvar}
          </Alert>
        ) : null}
        <VStack className={spørsmålStyles.knappeStack}>
          <Button
            variant="primary"
            className={spørsmålStyles.nesteknapp}
            onClick={håndterNesteknapp}
          >
            <SvarKnappTekst
              erPåLagretSvar={erPåLagretSvar}
              lagretSvar={lagretSvar}
            />
          </Button>
          <Button
            variant="secondary"
            className={spørsmålStyles.tilbakeknapp}
            onClick={navigerTilbake}
          >
            Tilbake
          </Button>
        </VStack>
      </VStack>
    </>
  );
}

function SvarKnappTekst({
  erPåLagretSvar,
  lagretSvar,
}: {
  erPåLagretSvar: boolean;
  lagretSvar?: string;
}) {
  if (erPåLagretSvar) {
    return "Neste";
  } else if (lagretSvar) {
    return "Endre svar";
  }

  return "Svar";
}
