"use client";

import React from "react";
import styles from "./sporsmalsside.module.css";
import { Alert, Button, Radio, RadioGroup, VStack } from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { spørsmålOgSvarDTO } from "@/app/_types/sporreundersokelseDTO";
import { postEnkeltSvar } from "@/app/_api_hooks/svar";

export default function Spørsmålsseksjon({
  spørsmålId,
  spørreundersøkelsesId,
  spørsmålOgSvar,
}: {
  spørsmålId: string;
  spørreundersøkelsesId: string;
  spørsmålOgSvar: spørsmålOgSvarDTO;
}) {
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();

  const [svar, setSvar] = React.useState("");
  const velgSvar = (svaralternativid: string) => setSvar(svaralternativid);

  const sendSvar = () => {
    if (!spørsmålOgSvar) {
      throw new Error("Spørsmål mangler");
    }
    postEnkeltSvar({
      spørreundersøkelseId: spørreundersøkelsesId,
      spørsmålId,
      svarId: svar,
    })
      .then(() => {
        setError(null);
        router.push(`./${spørsmålId}/neste`);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <Spørsmålsheader spørsmålOgSvar={spørsmålOgSvar} />
      <VStack align="center">
        <RadioGroup
          legend="Velg ett alternativ"
          onChange={velgSvar}
          value={svar}
          hideLegend
          className={styles.spørsmålsseksjon}
        >
          {spørsmålOgSvar.svaralternativer.map((svaralternativ) => (
            <Radio key={svaralternativ.id} value={svaralternativ.id}>
              {svaralternativ.tekst}
            </Radio>
          ))}
        </RadioGroup>
        {error !== null ? (
          <Alert variant="error" closeButton onClose={() => setError(null)}>
            {error}
          </Alert>
        ) : null}
        <Button
          variant="primary"
          className={styles.nesteknapp}
          onClick={sendSvar}
        >
          Neste
        </Button>
        <Button
          variant="secondary"
          className={styles.tilbakeknapp}
          onClick={() => {
            router.push(`./${spørsmålId}/tilbake`);
          }}
        >
          Tilbake
        </Button>
      </VStack>
    </>
  );
}

function Spørsmålsheader({
  spørsmålOgSvar,
}: {
  spørsmålOgSvar: spørsmålOgSvarDTO;
}) {
  return (
    <div className={styles.spørsmålsheader}>
      <span>
        {spørsmålOgSvar.spørsmålIndeks + 1}/
        {spørsmålOgSvar.sisteSpørsmålIndeks + 1}
      </span>
      <span>{spørsmålOgSvar.spørsmål}</span>
    </div>
  );
}
