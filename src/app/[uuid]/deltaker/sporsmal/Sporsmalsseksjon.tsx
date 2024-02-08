"use client";

import React from "react";
import { Spørsmål } from "./Sporsmal";
import styles from "./sporsmalsside.module.css";
import { Button, VStack } from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { spørreundersøkelseDTO } from "@/app/_types/sporreundersokelseDTO";
import { postEnkeltSvar } from "@/app/_api_hooks/svar";

function finnSpørsmålSomMatcherIndex(
  spørsmål: spørreundersøkelseDTO | undefined,
  storedSisteSvarteID?: string
) {
  if (!spørsmål || !storedSisteSvarteID) {
    return 0;
  }

  const funnetIndex = spørsmål?.findIndex?.(
    (spm) => spm.id === storedSisteSvarteID
  );

  return funnetIndex !== undefined && funnetIndex !== undefined
    ? Math.min(funnetIndex + 1, spørsmål.length - 1)
    : 0;
}

export default function Spørsmålsseksjon({
  spørsmål,
  undersøkelsesId,
  storedSisteSvarteID,
  gjeldendeSpørsmålindex,
}: {
  spørsmål: spørreundersøkelseDTO | undefined;
  undersøkelsesId: string;
  storedSisteSvarteID?: string;
  gjeldendeSpørsmålindex: number;
}) {
  const funnetIndex = finnSpørsmålSomMatcherIndex(
    spørsmål,
    storedSisteSvarteID
  );
  const [aktivtSpørsmålindex, setAktivtSpørsmålindex] =
    React.useState(funnetIndex);
  React.useEffect(() => {
    if (aktivtSpørsmålindex === 0 && funnetIndex !== 0) {
      setAktivtSpørsmålindex(funnetIndex);
    }
  }, [funnetIndex, aktivtSpørsmålindex]);
  const [svar, setSvar] = React.useState({} as Record<string, string>);
  const router = useRouter();

  const sendSvar = () => {
    if (!spørsmål) {
      console.log("Ingen spørsmål");
      return;
    }
    postEnkeltSvar({
      spørreundersøkelseId: undersøkelsesId,
      spørsmålId: spørsmål[aktivtSpørsmålindex].id,
      svarId: svar[spørsmål[aktivtSpørsmålindex].id],
    }).then(() => {
      // TODO: Sjekk at svar har funka før du går videre
      if (aktivtSpørsmålindex + 1 === spørsmål.length) {
        console.log("Siste spørsmål");
        router.push("ferdig");
      } else {
        console.log("Trykket neste");
        if (aktivtSpørsmålindex < gjeldendeSpørsmålindex) {
          console.log(
            "AktivtSpørsmålindex er mindre enn gjeldendeSpørsmålindex"
          );
          setAktivtSpørsmålindex((aktivtSpørsmålindex + 1) % spørsmål.length);
        }
      }
    });
  };

  if (!spørsmål) {
    return <div>VI HAR IKKE SPØRSMÅL!!!</div>;
  }

  return (
    <>
      <Spørsmålsheader
        aktivtSpørsmålindex={aktivtSpørsmålindex}
        spørsmål={spørsmål}
      />
      <div className={styles.spørsmålsseksjon}>
        <Spørsmål
          spørsmål={spørsmål[aktivtSpørsmålindex]}
          velgSvar={(spørsmålid, svaralternativid) =>
            setSvar((gamleSvar) => ({
              ...gamleSvar,
              [spørsmålid]: svaralternativid,
            }))
          }
          valgtSvar={svar[spørsmål[aktivtSpørsmålindex]?.id]}
        />
      </div>
      <VStack align="center">
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
