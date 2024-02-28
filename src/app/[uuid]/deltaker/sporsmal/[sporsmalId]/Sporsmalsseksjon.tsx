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
import { SvaralternativDTO } from "@/app/_types/SpørsmålDTO";
import { svar } from "@/app/_api_hooks/deltaker/svar";

export default function Spørsmålsseksjon({
  spørsmålId,
  spørreundersøkelseId,
  spørsmåltekst,
  svaralternativer,
}: {
  spørsmålId: string;
  spørreundersøkelseId: string;
  spørsmåltekst: string;
  svaralternativer: SvaralternativDTO[];
}) {
  const [feilSendSvar, setFeilSendSvar] = React.useState<string | null>(null);

  const router = useRouter();

  const [svarId, setSvarId] = React.useState("");
  const velgSvar = (svaralternativid: string) => setSvarId(svaralternativid);

  const sendSvar = () => {
    svar({ spørreundersøkelseId, spørsmålId, svarId })
      .then(() => {
        setFeilSendSvar(null);
        router.push(`./${spørsmålId}/neste`);
      })
      .catch((error) => {
        setFeilSendSvar(error.message);
      });
  };

  return (
    <>
      <BodyShort weight={"semibold"}>{spørsmåltekst}</BodyShort>
      <VStack className={spørsmålStyles.radioStack}>
        <RadioGroup
          legend="Velg ett alternativ"
          onChange={velgSvar}
          value={svarId}
          hideLegend
          className={spørsmålStyles.spørsmålsseksjon}
        >
          {svaralternativer.map((svaralternativ) => (
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
            onClick={sendSvar}
          >
            Svar
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
  );
}
