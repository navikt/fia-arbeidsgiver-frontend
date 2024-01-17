"use client";

import React from "react";
import { Spørsmål } from "./Spørsmål";
import styles from "./spørsmålsside.module.css";
import { Button } from "@navikt/ds-react";
import { partssamarbeid } from "@/utils/dummydata";
import { KartleggingsType } from "@/utils/typer";
import { useRouter } from "next/navigation";

export default function Spørsmålsseksjon() {
  const [aktivtSpørsmålindex, setAktivtSpørsmålindex] = React.useState(0);
  const [svar, setSvar] = React.useState({} as Record<string, string>);
  const kartleggingsKategori: KartleggingsType = partssamarbeid;

  const router = useRouter();

  return (
    <>
      <Spørsmålsheader
        tilgjengeligeSpørsmål={kartleggingsKategori?.spørsmål.length}
        aktivtSpørsmålindex={aktivtSpørsmålindex}
      />
      <div className={styles.spørsmålsseksjon}>
        <Spørsmål
          spørsmål={kartleggingsKategori.spørsmål[aktivtSpørsmålindex]}
          velgSvar={(spørsmålid, svaralternativid) =>
            setSvar((gamleSvar) => ({
              ...gamleSvar,
              [spørsmålid]: svaralternativid,
            }))
          }
          valgtSvar={
            svar[kartleggingsKategori.spørsmål[aktivtSpørsmålindex]?.id]
          }
        />
        <Button
          variant="secondary"
          className={styles.tilbakeknapp}
          onClick={() =>
            setAktivtSpørsmålindex(Math.max(aktivtSpørsmålindex - 1, 0))
          }
        >
          Tilbake
        </Button>
      </div>
      <Button
        variant="secondary"
        className={styles.tilbakeknapp}
        onClick={() => {
          aktivtSpørsmålindex + 1 === kartleggingsKategori.spørsmål.length
            ? router.push("ferdig")
            : setAktivtSpørsmålindex(
                (aktivtSpørsmålindex + 1) %
                  kartleggingsKategori.spørsmål.length,
              );
        }}
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
