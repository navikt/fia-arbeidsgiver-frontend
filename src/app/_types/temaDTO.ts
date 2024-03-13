import { spørsmålDTO, StatusType } from "@/app/_types/sporreundersokelseDTO";

export type TemaType = "UTVIKLE_PARTSSAMARBEID" | "REDUSERE_SYKEFRAVÆR";
export type temaDTO = {
  tema: TemaType;
  spørsmålOgSvaralternativer: spørsmålDTO[];
};
export type temastatusDTO = {
  tema: TemaType;
  status: StatusType;
  spørsmålindeks: number | null;
  antallSpørsmål: number;
};
