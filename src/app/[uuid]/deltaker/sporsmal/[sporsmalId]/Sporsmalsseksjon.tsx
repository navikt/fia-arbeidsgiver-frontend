"use client";

import React from "react";
import styles from "./sporsmalsside.module.css";
import {
  Alert,
  Button,
  Loader,
  Radio,
  RadioGroup,
  VStack,
} from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { spørreundersøkelseDTO } from "@/app/_types/sporreundersokelseDTO";
import { postEnkeltSvar } from "@/app/_api_hooks/svar";

function finnSpørsmålFraId(
  spørsmål: spørreundersøkelseDTO | undefined,
  spørsmålId: string,
) {
  if (!spørsmål) {
    return undefined;
  }
  return spørsmål.find((spm) => spm.id === spørsmålId);
}

function finnSpørsmålIndexFraId(
  spørsmål: spørreundersøkelseDTO | undefined,
  spørsmålId: string,
) {
  if (!spørsmål) {
    return 0;
  }
  return spørsmål.findIndex((spm) => spm.id === spørsmålId);
}

export default function Spørsmålsseksjon({
  spørsmål,
  spørsmålId,
  spørreundersøkelsesId,
}: {
  spørsmål: spørreundersøkelseDTO | undefined;
  spørsmålId: string;
  spørreundersøkelsesId: string;
}) {
  const aktivtSpørsmål = finnSpørsmålFraId(spørsmål, spørsmålId);
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();

  const [svar, setSvar] = React.useState({} as Record<string, string>);
  const velgSvar = (spørsmålid: string, svaralternativid: string) =>
    setSvar((gamleSvar) => ({
      ...gamleSvar,
      [spørsmålid]: svaralternativid,
    }));

  const sendSvar = () => {
    if (!spørsmål) {
      throw new Error("Spørsmål mangler");
    }
    postEnkeltSvar({
      spørreundersøkelseId: spørreundersøkelsesId,
      spørsmålId,
      svarId: svar[spørsmålId],
    })
      .then(() => {
        setError(null);
        router.push("./sporsmal/neste");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (!spørsmål) {
    return (
      <VStack gap={"4"} align={"center"}>
        <Loader size="3xlarge" title="Laster..." />
      </VStack>
    );
  }

  return (
    <>
      <Spørsmålsheader
        aktivtSpørsmålindex={finnSpørsmålIndexFraId(spørsmål, spørsmålId)}
        spørsmål={spørsmål}
      />
      <VStack align="center">
        <RadioGroup
          legend="Velg ett alternativ"
          onChange={(valgtSvarId: string) => velgSvar(spørsmålId, valgtSvarId)}
          defaultValue={svar[spørsmålId]}
          hideLegend
          className={styles.spørsmålsseksjon}
        >
          {aktivtSpørsmål?.svaralternativer.map((svaralternativ) => (
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
            // TODO: Gå tilbake til forrige spørsmål
          }}
        >
          Tilbake
        </Button>
      </VStack>
    </>
  );
}

function Spørsmålsheader({
  spørsmål,
  aktivtSpørsmålindex,
}: {
  spørsmål: spørreundersøkelseDTO;
  aktivtSpørsmålindex: number;
}) {
  return (
    <div className={styles.spørsmålsheader}>
      <span>
        {aktivtSpørsmålindex + 1}/{spørsmål.length}
      </span>
      <span>{spørsmål[aktivtSpørsmålindex].spørsmål}</span>
    </div>
  );
}
