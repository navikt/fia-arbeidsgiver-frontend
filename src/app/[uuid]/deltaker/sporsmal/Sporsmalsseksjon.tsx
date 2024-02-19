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
import { useKategoristatus } from "@/app/_api_hooks/sporsmalOgSvar";

export function finnSpørsmålSomMatcherIndex(
  spørsmål: spørreundersøkelseDTO | undefined,
  storedSisteSvarteID?: string,
) {
  if (!spørsmål || !storedSisteSvarteID) {
    return 0;
  }

  const funnetIndex = spørsmål?.findIndex?.(
    (spm) => spm.id === storedSisteSvarteID,
  );

  return funnetIndex !== undefined
    ? Math.min(funnetIndex + 1, spørsmål.length - 1)
    : 0;
}

export default function Spørsmålsseksjon({
  spørsmål,
  spørreundersøkelsesId,
  storedSisteSvarteID,
}: {
  spørsmål: spørreundersøkelseDTO | undefined;
  spørreundersøkelsesId: string;
  storedSisteSvarteID?: string;
}) {
  const [visFeilmelding, setVisFeilmelding] = React.useState(false);
  const router = useRouter();
  const funnetIndex = finnSpørsmålSomMatcherIndex(
    spørsmål,
    storedSisteSvarteID,
  );
  const [aktivtSpørsmålindex, setAktivtSpørsmålindex] =
    React.useState(funnetIndex);

  const { data: kategoristatus } = useKategoristatus(spørreundersøkelsesId);

  React.useEffect(() => {
    if (aktivtSpørsmålindex === 0 && funnetIndex !== 0) {
      setAktivtSpørsmålindex(funnetIndex);
    }
  }, [funnetIndex, aktivtSpørsmålindex]);

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
      spørsmålId: spørsmål[aktivtSpørsmålindex].id,
      svarId: svar[spørsmål[aktivtSpørsmålindex].id],
    }).then((success) => {
      if (!success) {
        setVisFeilmelding(true);
        return;
      }
      setVisFeilmelding(false);

      router.push("./sporsmal/neste");
    });
  };

  if (!spørsmål || !kategoristatus) {
    return (
      <VStack gap={"4"} align={"center"}>
        <Loader size="3xlarge" title="Laster..." />
      </VStack>
    );
  }

  return (
    <>
      <Spørsmålsheader
        aktivtSpørsmålindex={aktivtSpørsmålindex}
        spørsmål={spørsmål}
      />
      <VStack align="center">
        <RadioGroup
          legend="Velg ett alternativ"
          onChange={(valgtSvarId: string) =>
            velgSvar(spørsmål[aktivtSpørsmålindex].id, valgtSvarId)
          }
          defaultValue={svar[spørsmål[aktivtSpørsmålindex]?.id]}
          hideLegend
          className={styles.spørsmålsseksjon}
        >
          {spørsmål[aktivtSpørsmålindex].svaralternativer.map(
            (svaralternativ) => (
              <Radio key={svaralternativ.id} value={svaralternativ.id}>
                {svaralternativ.tekst}
              </Radio>
            ),
          )}
        </RadioGroup>
        {visFeilmelding && (
          <Alert
            variant="error"
            closeButton
            onClose={() => setVisFeilmelding(false)}
          >
            Svar ble ikke sendt
          </Alert>
        )}
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
          onClick={() =>
            setAktivtSpørsmålindex(Math.max(aktivtSpørsmålindex - 1, 0))
          }
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
