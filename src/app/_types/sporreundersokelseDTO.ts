export type StatusType = "OPPRETTET" | "IKKE_PÅBEGYNT" | "PÅBEGYNT";

export type KategoriType = "PARTSSAMARBEID";

export function finskrivKategori(kategori: KategoriType) {
  switch (kategori) {
    case "PARTSSAMARBEID":
      return "Partssamarbeid i virksomheten";
    default:
      return `Beskrivelse mangler for: ${kategori}`;
  }
}

export type spørreundersøkelseDTO = spørsmålDTO[];

export type spørsmålDTO = {
  id: string;
  spørsmål: string;
  svaralternativer: svaralternativDTO[];
};

export type kategoristatusDTO = {
  kategori: KategoriType;
  status: StatusType;
  spørsmålindeks: number | null;
  antallSpørsmål: number;
};

export interface spørsmålOgSvarDTO extends spørsmålDTO {
  spørsmålIndeks: number;
  sisteSpørsmålIndeks: number;
}

export type svaralternativDTO = {
  id: string;
  tekst: string;
};
