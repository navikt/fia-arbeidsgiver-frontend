export type SpørsmåloversiktDTO = {
  temabeskrivelse: string;
  spørsmålTekst: string;
  svaralternativer: SvaralternativDTO[];
  nesteSpørsmål: IdentifiserbartSpørsmålDTO | null;
  forrigeSpørsmål: IdentifiserbartSpørsmålDTO | null;
  spørsmålnummer: number;
  antallSpørsmål: number;
  temanummer: number;
  antallTema: number;
  flervalg: boolean;
};

export type SvaralternativDTO = {
  svarId: string;
  svartekst: string;
};

export type IdentifiserbartSpørsmålDTO = {
  temaId: number;
  spørsmålId: string;
};
