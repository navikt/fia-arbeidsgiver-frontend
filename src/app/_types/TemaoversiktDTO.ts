import { SvaralternativDTO } from "./SpørsmåloversiktDTO";

export type TemaoversiktDTO = {
  temaId: number;
  temanavn: string;
  del: number;
  tittel: string;
  beskrivelse: string;
  introtekst: string;
  status: TemaStatus;
  førsteSpørsmålId: string;
  spørsmålOgSvaralternativer: SpørsmålOgSvaralternativerDTO[];
};

export type SpørsmålOgSvaralternativerDTO = {
  id: string;
  spørsmål: string;
  svaralternativer: SvaralternativDTO[];
  flervalg: boolean;
};

export const enum TemaStatus {
  ÅPNET = "ÅPNET",
  IKKE_ÅPNET = "IKKE_ÅPNET",
  ALLE_SPØRSMÅL_ÅPNET = "ALLE_SPØRSMÅL_ÅPNET",
}
