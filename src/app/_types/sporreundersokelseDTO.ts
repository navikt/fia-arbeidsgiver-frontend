export type StatusType = "OPPRETTET" | "IKKE_PÅBEGYNT" | "PÅBEGYNT";

export type TemaType = "PARTSSAMARBEID";

export function finskrivTema(tema: TemaType) {
  switch (tema) {
    case "PARTSSAMARBEID":
      return "Partssamarbeid i virksomheten";
    default:
      return `Beskrivelse mangler for: ${tema}`;
  }
}

export type spørreundersøkelseDTO = spørsmålDTO[];

export type spørsmålDTO = {
  id: string;
  spørsmål: string;
  svaralternativer: svaralternativDTO[];
};

export type temastatusDTO = {
  tema: TemaType;
  status: StatusType;
  spørsmålindeks: number | null;
  antallSpørsmål: number;
};

export interface spørsmålOgSvarDTO extends spørsmålDTO {
  spørsmålIndeks: number;
  sisteSpørsmålIndeks: number;
  tema: TemaType;
}

export type svaralternativDTO = {
  id: string;
  tekst: string;
};
