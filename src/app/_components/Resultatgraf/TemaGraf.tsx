"use client";

import { Alert, BodyShort, Box, ToggleGroup } from "@navikt/ds-react";
import resultatgrafStyle from "./resultatgraf.module.css";
import { useTemaResultat } from "@/app/_api_hooks/vert/useTemaresultater";
import { SpørsmålResultatDto } from "@/app/_types/SpørsmålResultatDto";
import { TemaResultatDto } from "@/app/_types/TemaResultatDto";
import { Loader } from "@navikt/ds-react";
import BarChart from "./BarChart";
import React from "react";
import useTimeHasElapsed from "@/utils/useTimeHasElapsed";
import TekstligResultatvisning from "./TekstligResultatvisning";

export default function TemaGraf({
  tema,
  brukTekstvisning,
  setBrukTekstvisning,
  skjulToggleGroup = false,
}: {
  tema: TemaResultatDto | undefined;
  brukTekstvisning: boolean;
  setBrukTekstvisning: React.Dispatch<React.SetStateAction<boolean>>;
  skjulToggleGroup?: boolean;
}) {
  if (tema === undefined) {
    return (
      <div className={resultatgrafStyle.loaderWrapper}>
        <Loader size="3xlarge" title="Laster tema" variant="interaction" />
      </div>
    );
  }
  return (
    <div className={resultatgrafStyle.boksContainer}>
      {!skjulToggleGroup && (
        <div className={resultatgrafStyle.grafTabellBryterWrapper}>
          <ToggleGroup
            className={resultatgrafStyle.grafTabellBryter}
            size="small"
            value={brukTekstvisning ? "tabell" : "graf"}
            aria-label="Hvis du bruker skjermleser, bør du velge tabell"
            onChange={(value) => {
              setBrukTekstvisning(value === "tabell");
            }}
          >
            <ToggleGroup.Item value="graf">Graf</ToggleGroup.Item>
            <ToggleGroup.Item value="tabell">Tabell</ToggleGroup.Item>
          </ToggleGroup>
        </div>
      )}
      {tema.spørsmålMedSvar.map((spørsmål, index) => {
        const farge = getGraffargeFromTema(tema);
        return (
          <Box
            key={index}
            borderRadius="xlarge"
            padding="12"
            background="bg-default"
            className={`${resultatgrafStyle.temaboks} ${trengerEkstraBredde(tema, spørsmål, index) ? resultatgrafStyle.flervalgTemaboks : ""}`}
          >
            <FargetKategoritittel
              tittel={spørsmål.kategori}
              temanavn={tema.navn}
            />
            {brukTekstvisning ? (
              <TekstligResultatvisning
                key={index}
                spørsmål={spørsmål}
                farge={farge ?? "var(--a-blue-500)"}
              />
            ) : spørsmål.flervalg ? (
              <BarChart
                key={index}
                spørsmål={spørsmål}
                farge={farge}
                horizontal
              />
            ) : (
              <BarChart key={index} spørsmål={spørsmål} farge={farge} />
            )}
          </Box>
        );
      })}
    </div>
  );
}

function FargetKategoritittel({
  tittel,
  temanavn,
}: {
  tittel?: string;
  temanavn?: string | null;
}) {
  if (tittel === "" || tittel === undefined || tittel === null) {
    return null;
  }

  return (
    <BodyShort
      className={`${resultatgrafStyle.kategoritittel} ${getFargeKategoriTittelKlasse(temanavn)}`}
    >
      {tittel}
    </BodyShort>
  );
}

function getFargeKategoriTittelKlasse(temanavn?: string | null) {
  switch (temanavn?.toLowerCase()) {
    case "partssamarbeid":
      return resultatgrafStyle.blå;
    case "sykefraværsarbeid":
      return resultatgrafStyle.grønn;
    case "arbeidsmiljø":
      return resultatgrafStyle.gul;
    default:
      break;
  }
}

function getGraffargeFromTema(tema: TemaResultatDto) {
  switch (tema.navn?.toLowerCase()) {
    case "partssamarbeid":
      return "var(--a-blue-500)";
    case "sykefraværsarbeid":
      return "var(--a-green-500)";
    case "arbeidsmiljø":
      return "var(--a-orange-600)";
    default:
      break;
  }
}

function trengerEkstraBredde(
  tema: TemaResultatDto,
  spørsmål: SpørsmålResultatDto,
  index: number,
) {
  if (spørsmål.flervalg) {
    return true;
  }
  // Tving bar-chart til å ta full row om vi ender opp men en alene.
  if (index === 0 || tema.spørsmålMedSvar[index - 1].flervalg) {
    // Hvis vi er første etter start eller flervalg (vi er på en ny linje med ikke-flervalg)

    const nesteFlervalg = tema.spørsmålMedSvar.findIndex(
      (spm, ind) => spm.flervalg && ind > index,
    );
    const nesteLineBreak =
      nesteFlervalg === -1 ? tema.spørsmålMedSvar.length : nesteFlervalg;

    const antallSpørsmål = nesteLineBreak - index;

    if (antallSpørsmål % 2 === 1) {
      return true;
    }
  }

  return false;
}

export function TemaGrafMedDatahenting({
  temaId,
  spørreundersøkelseId,
  brukTekstvisning,
  setBrukTekstvisning,
  skjulToggleGroup = false,
}: {
  temaId: number;
  spørreundersøkelseId: string;
  brukTekstvisning: boolean;
  setBrukTekstvisning: React.Dispatch<React.SetStateAction<boolean>>;
  skjulToggleGroup?: boolean;
}) {
  // Ignorer errors de første 20 sekundene etter load, ettersom vi får 403 på første load etter at vi har avsluttet tema.
  // TODO: Fjern denne når vi får fikset at beckend sender error første gang
  const visErrorOmDenFinnes = useTimeHasElapsed(20000);
  const { data: tema, error } = useTemaResultat(spørreundersøkelseId, temaId);

  if (error && visErrorOmDenFinnes) {
    return (
      <Alert variant="error" role="alert" aria-live="polite">
        {error.message}
      </Alert>
    );
  }

  return (
    <TemaGraf
      tema={tema}
      brukTekstvisning={brukTekstvisning}
      setBrukTekstvisning={setBrukTekstvisning}
      skjulToggleGroup={skjulToggleGroup}
    />
  );
}
