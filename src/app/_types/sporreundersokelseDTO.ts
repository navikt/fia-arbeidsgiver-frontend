import { Tema } from "@/app/_types/temaDTO";
export const enum Status {
  OPPRETTET = "OPPRETTET",
  IKKE_PÅBEGYNT = "IKKE_PÅBEGYNT",
  PÅBEGYNT = "PÅBEGYNT",
}

export type spørreundersøkelseDTO = spørsmålDTO[];

export type spørsmålDTO = {
  id: string;
  spørsmål: string;
  svaralternativer: svaralternativDTO[];
};

export interface spørsmålOgSvarDTO extends spørsmålDTO {
  spørsmålIndeks: number;
  sisteSpørsmålIndeks: number;
  tema: Tema;
}

export type svaralternativDTO = {
  id: string;
  tekst: string;
};
