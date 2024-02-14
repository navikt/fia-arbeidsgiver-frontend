export type KategoriType = "PARTSSAMARBEID";

export type StatusType =
  | "OPPRETTET"
  | "HOPP_OVER" // kun frontend ? fjern?
  | "IKKE_PÅBEGYNT"
  | "PÅBEGYNT"
  | "FERDIG"; // kun frontend? fjern?
export type spørreundersøkelseDTO = spørsmålDTO[];

export type spørsmålDTO = {
  spørsmålId: string;
  spørsmål: string;
  svaralternativer: svaralternativDTO[];
};

export type spørsmålIndeksDTO = {
  spørreundersøkelseId: string;
  indeks: number;
};

export type svaralternativDTO = {
  svarId: string;
  tekst: string;
};

export type kategoristatusDTO = {
  kategori: KategoriType;
  status: StatusType;
  spørsmålindeks: number | null;
};
