import { Tematittel } from "@/app/_types/SpørreundersøkelseStatusDTO";

export type SpørsmålDTO = {
  spørsmålId: string;
  spørsmåltekst: string;
  tematittel: Tematittel;
  svaralternativer: SvaralternativDTO[];
  spørsmålNummer: number;
  antallSpørsmålTema: number;
};

export type SvaralternativDTO = {
  svarId: string;
  svartekst: string;
};
