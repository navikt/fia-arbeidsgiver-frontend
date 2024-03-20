import { IdentifiserbartSpørsmål } from "@/app/_types/identifiserbartSpørsmål";

export type SpørsmålsoversiktDto = {
  spørsmålTekst: string;
  svaralternativer: SvaralternativDto[];
  nesteSpørsmål: IdentifiserbartSpørsmål | null;
  forrigeSpørsmål: IdentifiserbartSpørsmål | null;
};

export type SvaralternativDto = {
  svarId: string;
  svartekst: string;
};
