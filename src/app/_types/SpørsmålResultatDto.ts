import { SvarResultat } from "@/app/_types/SvarResultat";

export type SpørsmålResultatDto = {
  id: string;
  tekst: string;
  flervalg: boolean;
  svarListe: SvarResultat[];
};
