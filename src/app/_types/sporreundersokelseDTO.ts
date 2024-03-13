export type StatusType = "OPPRETTET" | "IKKE_PÅBEGYNT" | "PÅBEGYNT";

export type TemaType = "UTVIKLE_PARTSSAMARBEID" | "REDUSERE_SYKEFRAVÆR";

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
