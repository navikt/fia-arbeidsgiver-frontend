export type KategoriType = "PARTSSAMARBEID";

export type StatusType =
  | "OPPRETTET"
  | "HOPP_OVER" // kun frontend ? fjern?
  | "IKKE_PÅBEGYNT"
  | "PÅBEGYNT"
  | "FERDIG"; // kun frontend? fjern?

export type spørreundersøkelseDTO = spørsmålDTO[];

export type spørsmålDTO = {
  id: string;
  spørsmål: string;
  svaralternativer: svaralternativDTO[];
};

export type svaralternativDTO = {
  id: string;
  tekst: string;
};

export type spørsmålIndeksDTO = {
  spørreundersøkelseId: string;
  indeks: number;
};
