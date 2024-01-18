"use client";

import React from "react";
import { Spørsmål } from "./Spørsmål";
import styles from "./spørsmålsside.module.css";
import { Button } from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { spørreundersøkelseDTO } from "@/app/_types/spørreundersøkelseDTO";
import {
  SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY,
  postEnkeltSvar,
} from "@/app/_api_hooks/enkeltSvar";

function finnSpørsmålIndexFraLocalstorage(
  spørsmål: spørreundersøkelseDTO | null
) {
  const id = localStorage.getItem(SISTE_SVARTE_SPØRSMÅL_ID_STORAGE_KEY);

  if (!spørsmål || !id) {
    return 0;
  }

  const funnetIndex = spørsmål?.findIndex?.((spm) => spm.id === id);

  return funnetIndex !== undefined && funnetIndex !== null
    ? Math.min(funnetIndex + 1, spørsmål.length - 1)
    : 0;
}

export default function Spørsmålsseksjon({
  spørsmål,
  undersøkelsesId,
}: {
  spørsmål: spørreundersøkelseDTO | null;
  undersøkelsesId: string;
}) {
  const funnetIndex = finnSpørsmålIndexFraLocalstorage(spørsmål);
  const [aktivtSpørsmålindex, setAktivtSpørsmålindex] =
    React.useState(funnetIndex);
  const [svar, setSvar] = React.useState({} as Record<string, string>);

  const router = useRouter();

  const sendSvar = () => {
    if (!spørsmål) {
      return;
    }
    postEnkeltSvar({
      spørreundersøkelseId: undersøkelsesId,
      spørsmålId: spørsmål[aktivtSpørsmålindex].id,
      svarId: svar[spørsmål[aktivtSpørsmålindex].id],
    });
    // TODO: Sjekk at svar har funka før du går videre
    if (aktivtSpørsmålindex + 1 === spørsmål.length) {
      router.push("ferdig");
    } else {
      setAktivtSpørsmålindex((aktivtSpørsmålindex + 1) % spørsmål.length);
    }
  };

  if (!spørsmål) {
    return <div>VI HAR IKKE SPØRSMÅL!!!</div>;
  }

  return (
    <>
      <Spørsmålsheader
        tilgjengeligeSpørsmål={spørsmål.length}
        aktivtSpørsmålindex={aktivtSpørsmålindex}
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
      <Button
        variant="secondary"
        className={styles.tilbakeknapp}
        onClick={() =>
          setAktivtSpørsmålindex(Math.max(aktivtSpørsmålindex - 1, 0))
        }
      >
        Tilbake
      </Button>
      <Button
        variant="secondary"
        className={styles.tilbakeknapp}
        onClick={sendSvar}
      >
        Neste
      </Button>
    </>
  );
}

function Spørsmålsheader({
  tilgjengeligeSpørsmål,
  aktivtSpørsmålindex,
}: {
  tilgjengeligeSpørsmål: number;
  aktivtSpørsmålindex: number;
}) {
  return (
    <div className={styles.spørsmålsheader}>
      <span>
        {aktivtSpørsmålindex + 1}/{tilgjengeligeSpørsmål}
      </span>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
      </span>
    </div>
  );
}
