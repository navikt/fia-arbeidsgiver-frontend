import { IdentifiserbartSpørsmål } from "@/app/_types/identifiserbartSpørsmål";

export type SpørsmålsoversiktDto = {
  temabeskrivelse: string;
  spørsmålTekst: string;
  svaralternativer: SvaralternativDto[];
  nesteSpørsmål: IdentifiserbartSpørsmål | null;
  forrigeSpørsmål: IdentifiserbartSpørsmål | null;
  spørsmålnummer: number;
  antallSpørsmål: number;
  temanummer: number;
  antallTema: number;
  flervalg: boolean;
};

export type SvaralternativDto = {
  svarId: string;
  svartekst: string;
};
