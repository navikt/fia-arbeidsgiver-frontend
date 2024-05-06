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
import { SpørsmåloversiktDTO } from "@/app/_types/SpørsmåloversiktDTO";
import CookieHandler from "@/utils/CookieHandler";
import { urlNeste, urlTilbake } from "@/utils/spørreundersøkelsesUtils";
import { fetchIdentifiserbartSpørsmål } from "@/app/_api_hooks/deltaker/fetchIdentifiserbartSpørsmål";
import { ArrowRightIcon } from "@navikt/aksel-icons";

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
      <Box
        borderRadius="xlarge"
        padding="5"
        className={spørsmålStyles.innholdboks}
      >
        <VStack className={spørsmålStyles.radioStack}>
          {spørsmålOgSvar.flervalg ? (
            <CheckboxGroup
              onChange={velgSvar}
              legend={
                <>
                  {spørsmålOgSvar.spørsmålTekst}
                  <br />
                  <span className={spørsmålStyles.normaltekst}>
                    (flere valg er mulig)
                  </span>
                </>
              }
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
              legend={spørsmålOgSvar.spørsmålTekst}
              onChange={(value) => velgSvar([value])}
              value={svar[0] || null}
              className={spørsmålStyles.spørsmålsseksjon}
              error={feilSendSvar}
            >
              {spørsmålOgSvar.svaralternativer.map((svaralternativ) => (
                <Radio
                  key={svaralternativ.svarId}
                  value={svaralternativ.svarId}
                >
                  {svaralternativ.svartekst}
                </Radio>
              ))}
            </RadioGroup>
          )}
        </VStack>
      </Box>
      <HStack justify={"end"} gap={"2"} className={spørsmålStyles.knappeStack}>
        {spørsmålOgSvar.forrigeSpørsmål !== null ? (
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
        >
          <HStack align={"center"} justify={"center"} gap={"2"}>
            <SvarKnappTekst
              erPåLagretSvar={erPåLagretSvar(svar, lagretSvar)}
              lagretSvar={lagretSvar}
            />
            <ArrowRightIcon aria-hidden fontSize={"1.5rem"} />
          </HStack>
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
