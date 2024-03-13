import { TemaType } from "@/app/_types/temaDTO";

export type StatusType = "OPPRETTET" | "IKKE_PÅBEGYNT" | "PÅBEGYNT";

export type spørreundersøkelseDTO = spørsmålDTO[];

export type spørsmålDTO = {
  id: string;
  spørsmål: string;
  svaralternativer: svaralternativDTO[];
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
