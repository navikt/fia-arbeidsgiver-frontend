export type TemaoversiktDTO = {
  tittel: string;
  temanavn: string;
  temaId: TemaID;
  del: number;
  beskrivelse: string;
  introtekst: string;
  førsteSpørsmålId: string;
  status: TemaStatus;
};

export const enum TemaStatus {
  ÅPNET = "ÅPNET",
  IKKE_ÅPNET = "IKKE_ÅPNET",
  ALLE_SPØRSMÅL_ÅPNET = "ALLE_SPØRSMÅL_ÅPNET",
}

export type TemaID =
  | "UTVIKLE_PARTSSAMARBEID"
  | "REDUSERE_SYKEFRAVÆR"
  | "ARBEIDSMILJØ";
