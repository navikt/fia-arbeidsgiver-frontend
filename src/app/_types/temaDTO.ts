import { spørsmålDTO, Status } from "@/app/_types/sporreundersokelseDTO";
export const enum Tema {
  UTVIKLE_PARTSSAMARBEID = "UTVIKLE_PARTSSAMARBEID",
  REDUSERE_SYKEFRAVÆR = "REDUSERE_SYKEFRAVÆR",
}

export type temaDTO = {
  tema: Tema;
  spørsmålOgSvaralternativer: spørsmålDTO[];
};

export type spørreundersøkelseMedTemaDTO = temaDTO[];

export type temastatusDTO = {
  tema: Tema;
  status: Status;
  spørsmålindeks: number | null;
  antallSpørsmål: number;
};
