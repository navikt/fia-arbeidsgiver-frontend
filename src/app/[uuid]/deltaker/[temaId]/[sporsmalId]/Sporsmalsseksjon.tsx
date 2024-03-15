"use client";

import React from "react";
import spørsmålStyles from "./sporsmalsside.module.css";
import {
  Alert,
  BodyShort,
  Button,
  Heading,
  Loader,
  Radio,
  RadioGroup,
  VStack,
} from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/deltaker/useSpørsmålOgSvar";
import { postEnkeltSvar } from "@/app/_api_hooks/deltaker/svar";

export default function Spørsmålsseksjon({
  spørsmålId,
  spørreundersøkelseId,
  temaId,
  lagretSvar,
}: {
  spørsmålId: string;
  spørreundersøkelseId: string;
  temaId: string;
  lagretSvar?: string;
}) {
  const [feilSendSvar, setFeilSendSvar] = React.useState<string | null>(null);

  const {
    data: spørsmålOgSvar,
    isLoading: lasterSpørsmål,
    error: feilSpørsmål,
  } = useSpørsmålOgSvar(spørreundersøkelseId, temaId, spørsmålId);

  const router = useRouter();

  const [svar, setSvar] = React.useState(lagretSvar || "");
  const velgSvar = (svaralternativid: string) => setSvar(svaralternativid);

  const erPåLagretSvar = svar === lagretSvar && lagretSvar?.length > 0;

  const sendSvarEllerGåVidere = () => {
    if (!spørsmålOgSvar) {
      throw new Error("Spørsmål mangler");
    } else if (erPåLagretSvar) {
      router.push(`./${spørsmålId}/neste`);
    } else {
      postEnkeltSvar({
        spørreundersøkelseId: spørreundersøkelseId,
        spørsmålId,
        svarId: svar,
      })
        .then(() => {
          setFeilSendSvar(null);
          router.push(`./${spørsmålId}/neste`);
        })
        .catch((error) => {
          setFeilSendSvar(error.message);
        });
    }
  };

  if (lasterSpørsmål) {
    return (
      <VStack gap={"4"} align={"center"}>
        <Loader size="3xlarge" title="Laster..." />
      </VStack>
    );
  }

  if (feilSpørsmål) {
    return (
      <Heading size="large" level="1">
        {feilSpørsmål.message}
      </Heading>
    );
  }

  return (
    spørsmålOgSvar && (
      <>
        <BodyShort weight={"semibold"}>{spørsmålOgSvar.spørsmål}</BodyShort>
        <VStack className={spørsmålStyles.radioStack}>
          <RadioGroup
            legend="Velg ett alternativ"
            onChange={velgSvar}
            value={svar}
            hideLegend
            className={spørsmålStyles.spørsmålsseksjon}
          >
            {spørsmålOgSvar.svaralternativer.map((svaralternativ) => (
              <Radio key={svaralternativ.id} value={svaralternativ.id}>
                {svaralternativ.tekst}
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
              onClick={sendSvarEllerGåVidere}
            >
              <SvarKnappTekst
                erPåLagretSvar={erPåLagretSvar}
                lagretSvar={lagretSvar}
              />
            </Button>
            <Button
              variant="secondary"
              className={spørsmålStyles.tilbakeknapp}
              onClick={() => {
                router.push(`./${spørsmålId}/tilbake`);
              }}
            >
              Tilbake
            </Button>
          </VStack>
        </VStack>
      </>
    )
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
