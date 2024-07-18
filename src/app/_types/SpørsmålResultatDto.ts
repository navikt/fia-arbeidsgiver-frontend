import { SvarResultatDto } from "@/app/_types/SvarResultatDto";

export type SpørsmålResultatDto = {
  id: string;
  tekst: string;
  flervalg: boolean;
  svar: SvarResultatDto[];
};
