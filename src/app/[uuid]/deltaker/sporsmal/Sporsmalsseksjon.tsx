"use client";

import React from "react";
import styles from "./sporsmalsside.module.css";
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
import { spørreundersøkelseDTO } from "@/app/_types/sporreundersokelseDTO";
import { postEnkeltSvar } from "@/app/_api_hooks/svar";
import { useKategoristatus } from "@/app/_api_hooks/sporsmalOgSvar";

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

function måVentePåVert(vertIndeks: number | null, deltakerIndeks: number) {
  return vertIndeks !== null && deltakerIndeks < vertIndeks;
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

  const [venterPåVert, setVenterPåVert] = React.useState(false);
  React.useEffect(() => {
    if (kategoristatus === undefined) {
      console.log("Kunne ikke hente status");
      return;
    }
    setVenterPåVert(
      måVentePåVert(kategoristatus.spørsmålindeks, aktivtSpørsmålindex),
    );
  }, [aktivtSpørsmålindex, kategoristatus]);

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
    if (kategoristatus === undefined) {
      console.log(`gjeldende spørsmål er undefined`);
      return;
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
      if (aktivtSpørsmålindex + 1 === spørsmål.length) {
        router.push("ferdig");
      } else {
        if (måVentePåVert(kategoristatus.spørsmålindeks, aktivtSpørsmålindex)) {
          setAktivtSpørsmålindex((aktivtSpørsmålindex + 1) % spørsmål.length);
        }
      }
    });
  };

  if (!spørsmål || !kategoristatus) {
    return (
      <VStack gap={"4"} align={"center"}>
        <Loader size="3xlarge" title="Laster..." />
      </VStack>
    );
  }

  if (
    kategoristatus.status === "OPPRETTET" ||
    kategoristatus.status === "IKKE_PÅBEGYNT"
  ) {
    return (
      <VStack gap={"4"} align={"center"}>
        <Heading size={"large"}>
          Venter på at verten skal starte kartlegging
        </Heading>
        <Loader size="3xlarge" title="Venter..." />
      </VStack>
    );
  }

  if (venterPåVert) {
    return (
      <VStack gap={"4"} align={"center"}>
        <Heading size={"large"}>Venter på at verten skal fortsette</Heading>
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
          onClick={() => sendSvar()}
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
