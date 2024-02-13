"use client";

import React from "react";
import styles from "./sporsmalsside.module.css";
import {
  Button,
  Heading,
  Loader,
  Radio,
  RadioGroup,
  VStack,
} from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { spørreundersøkelseDTO } from "@/app/_types/sporreundersokelseDTO";
import { postEnkeltSvar } from "@/app/_api_hooks/svar";
import { useSpørsmålIndeks } from "@/app/_api_hooks/sporsmalOgSvar";

function finnSpørsmålSomMatcherIndex(
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
  const router = useRouter();
  const funnetIndex = finnSpørsmålSomMatcherIndex(
    spørsmål,
    storedSisteSvarteID,
  );
  const [aktivtSpørsmålindex, setAktivtSpørsmålindex] =
    React.useState(funnetIndex);

  const { data: gjeldendeSpørsmål } = useSpørsmålIndeks(spørreundersøkelsesId);
  React.useEffect(() => {
    if (aktivtSpørsmålindex === 0 && funnetIndex !== 0) {
      setAktivtSpørsmålindex(funnetIndex);
    }
  }, [funnetIndex, aktivtSpørsmålindex]);

  const [venterPåVert, setVenterPåVert] = React.useState(false);
  React.useEffect(() => {
    if (gjeldendeSpørsmål === undefined) {
      console.log("Har ikke et gjeldende spørsmål");
      return;
    }
    console.log("Setter loading til false");
    sendSvar();
  }, [gjeldendeSpørsmål]);

  const [svar, setSvar] = React.useState({} as Record<string, string>);
  const velgSvar = (spørsmålid: string, svaralternativid: string) =>
    setSvar((gamleSvar) => ({
      ...gamleSvar,
      [spørsmålid]: svaralternativid,
    }));

  const sendSvar = () => {
    if (!spørsmål) {
      console.log("Ingen spørsmål");
      return;
    }
    if (gjeldendeSpørsmål === undefined) {
      console.log(`gjeldende spørsmål er undefined`);
      return;
    }
    postEnkeltSvar({
      spørreundersøkelseId: spørreundersøkelsesId,
      spørsmålId: spørsmål[aktivtSpørsmålindex].id,
      svarId: svar[spørsmål[aktivtSpørsmålindex].id],
    }).then(() => {
      if (aktivtSpørsmålindex + 1 === spørsmål.length) {
        console.log("Siste spørsmål");
        router.push("ferdig");
      } else {
        console.log("Trykket neste");
        if (aktivtSpørsmålindex < gjeldendeSpørsmål.indeks) {
          console.log(
            "AktivtSpørsmålindex er mindre enn gjeldendeSpørsmål.indeks",
          );
          setVenterPåVert(false);
          setAktivtSpørsmålindex((aktivtSpørsmålindex + 1) % spørsmål.length);
          console.log("Setter loading til false");
        } else {
          setVenterPåVert(true);
          console.log("Setter loading til true");
        }
      }
    });
  };

  if (!spørsmål) {
    return (
      <VStack gap={"4"} align={"center"}>
        <Loader size="3xlarge" title="Laster..." />
      </VStack>
    );
  }

  return !venterPåVert ? (
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
  ) : (
    <VStack gap={"4"} align={"center"}>
      <Heading size={"large"}>Venter på at andre skal svare</Heading>
      <Loader size="3xlarge" title="Venter..." />
      <Button
        variant="secondary"
        className={styles.tilbakeknapp}
        onClick={() => setVenterPåVert(false)}
      >
        Tilbake
      </Button>
    </VStack>
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
