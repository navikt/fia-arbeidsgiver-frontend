export function finskrivTematittel(tittel: Tematittel) {
  switch (tittel) {
    case "PARTSSAMARBEID":
      return "Partssamarbeid i virksomheten";
    case "SYKEFRAVÆRSARBEID":
      return "Sykefraværsarbeid i virksomheten";
    default:
      return `Temanavn: ${tittel}`;
  }
}

export type SpørreundersøkelseStatusDTO = {
  status: Spørreundersøkelsestatus;
  antallDeltakere: number;
  temaer: TemaStatusDTO[];
};

export type Spørreundersøkelsestatus = "OPPRETTET" | "AVSLUTTET";

export type TemaStatusDTO = {
  tittel: Tematittel;
  status: Temastatus;
  gjeldendeSpørsmålnummer: number;
  antallSpørsmål: number;
};

export type Tematittel = "PARTSSAMARBEID" | "SYKEFRAVÆRSARBEID";

export type Temastatus = "IKKE_PÅBEGYNT" | "PÅBEGYNT" | "FULLFØRT";
