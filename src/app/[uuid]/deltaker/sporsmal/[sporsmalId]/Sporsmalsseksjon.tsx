"use client";

import React from "react";
import spørsmålStyles from "./sporsmalsside.module.css";
import {
  Alert,
  Button,
  Heading,
  Loader,
  Radio,
  RadioGroup,
  VStack,
} from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { spørsmålOgSvarDTO } from "@/app/_types/sporreundersokelseDTO";
import { postEnkeltSvar } from "@/app/_api_hooks/svar";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/useSpørsmålOgSvar";

export default function Spørsmålsseksjon({
  spørsmålId,
  spørreundersøkelseId,
}: {
  spørsmålId: string;
  spørreundersøkelseId: string;
}) {
  const [feilSendSvar, setFeilSendSvar] = React.useState<string | null>(null);

  const {
    data: spørsmålOgSvar,
    isLoading: lasterSpørsmål,
    error: feilSpørsmål,
  } = useSpørsmålOgSvar(spørreundersøkelseId, spørsmålId);

  const router = useRouter();

  const [svar, setSvar] = React.useState("");
  const velgSvar = (svaralternativid: string) => setSvar(svaralternativid);

  const sendSvar = () => {
    if (!spørsmålOgSvar) {
      throw new Error("Spørsmål mangler");
    }
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
        <Spørsmålsheader spørsmålOgSvar={spørsmålOgSvar} />
        {/*<Spørsmålsheader aktivtSpørsmålindex={finnSpørsmålIndexFraId(spørsmål, spørsmålId)} spørsmål={spørsmål} />*/}
        <VStack align="center">
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
          <Button
            variant="primary"
            className={spørsmålStyles.nesteknapp}
            onClick={sendSvar}
          >
            Neste
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
      </>
    )
  );
}

function Spørsmålsheader({
  spørsmålOgSvar,
}: {
  spørsmålOgSvar: spørsmålOgSvarDTO;
}) {
  return (
    <div className={spørsmålStyles.spørsmålsheader}>
      <span>
        {spørsmålOgSvar.spørsmålIndeks + 1}/
        {spørsmålOgSvar.sisteSpørsmålIndeks + 1}
      </span>
      <span>{spørsmålOgSvar.spørsmål}</span>
    </div>
  );
}
