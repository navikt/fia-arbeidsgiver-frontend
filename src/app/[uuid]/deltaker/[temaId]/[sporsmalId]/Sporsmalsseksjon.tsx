"use client";

import React from "react";
import spørsmålStyles from "./sporsmalsside.module.css";
import {
  BodyShort,
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  VStack,
} from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { sendSvar } from "@/app/_api_hooks/deltaker/sendSvar";
import { SpørsmåloversiktDTO } from "@/app/_types/SpørsmåloversiktDTO";
import CookieHandler from "@/utils/CookieHandler";
import { urlNeste, urlTilbake } from "@/utils/spørreundersøkelsesUtils";
import { fetchIdentifiserbartSpørsmål } from "@/app/_api_hooks/deltaker/fetchIdentifiserbartSpørsmål";

export default function Spørsmålsseksjon({
  spørsmålId,
  spørreundersøkelseId,
  temaId,
  spørsmålOgSvar,
}: {
  spørsmålId: string;
  spørreundersøkelseId: string;
  temaId: number;
  spørsmålOgSvar: SpørsmåloversiktDTO;
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
    if (!spørsmålOgSvar) {
      throw new Error("Spørsmål mangler");
    }

    if (erPåLagretSvar(svar, lagretSvar)) {
      router.push(urlNeste(spørsmålOgSvar));
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
          router.push(urlNeste(spørsmålOgSvar));
        })
        .catch((error) => {
          if (error.message == "Tema stengt, hent nytt spørsmål") {
            console.log("Hent et nytt spørsmål");
            fetchIdentifiserbartSpørsmål(spørreundersøkelseId).then(
              ({ spørsmålId, temaId }) => {
                router.push(`../../deltaker/${temaId}/${spørsmålId}`);
              },
            );
          } else {
            setFeilSendSvar(error.message);
          }
        });
    }
  };

  const håndterTilbakeknapp = () => {
    if (!spørsmålOgSvar) {
      throw new Error("Spørsmål mangler");
    }
    const url = urlTilbake(spørsmålOgSvar);
    if (url !== null) {
      router.push(url);
    }
  };

  return (
    <>
      <BodyShort weight={"semibold"}>
        {spørsmålOgSvar.spørsmålTekst}{" "}
        {spørsmålOgSvar.flervalg ? (
          <BodyShort>(flere valg er mulig)</BodyShort>
        ) : null}
      </BodyShort>
      <VStack className={spørsmålStyles.radioStack}>
        {spørsmålOgSvar.flervalg ? (
          <CheckboxGroup
            onChange={velgSvar}
            legend={"Velg flere alternativ"}
            hideLegend
            value={svar}
            error={feilSendSvar}
          >
            {spørsmålOgSvar.svaralternativer.map((svaralternativ) => (
              <Checkbox
                key={svaralternativ.svarId}
                value={svaralternativ.svarId}
              >
                {svaralternativ.svartekst}
              </Checkbox>
            ))}
          </CheckboxGroup>
        ) : (
          <RadioGroup
            legend="Velg ett alternativ"
            onChange={(value) => velgSvar([value])}
            value={svar[0] || null}
            hideLegend
            className={spørsmålStyles.spørsmålsseksjon}
            error={feilSendSvar}
          >
            {spørsmålOgSvar.svaralternativer.map((svaralternativ) => (
              <Radio key={svaralternativ.svarId} value={svaralternativ.svarId}>
                {svaralternativ.svartekst}
              </Radio>
            ))}
          </RadioGroup>
        )}
        <VStack className={spørsmålStyles.knappeStack}>
          <Button
            variant="primary"
            className={spørsmålStyles.nesteknapp}
            onClick={håndterNesteknapp}
          >
            <SvarKnappTekst
              erPåLagretSvar={erPåLagretSvar(svar, lagretSvar)}
              lagretSvar={lagretSvar}
            />
          </Button>
          {spørsmålOgSvar.forrigeSpørsmål !== null ? (
            <Button
              variant="secondary"
              className={spørsmålStyles.tilbakeknapp}
              onClick={håndterTilbakeknapp}
            >
              Tilbake
            </Button>
          ) : null}
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
  lagretSvar?: string[];
}) {
  if (erPåLagretSvar) {
    return "Neste";
  } else if (lagretSvar) {
    return "Endre svar";
  }
  return "Svar";
}
