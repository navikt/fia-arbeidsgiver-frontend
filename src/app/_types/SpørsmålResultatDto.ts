import { SvarResultatDto } from "@/app/_types/SvarResultatDto";

export type SpørsmålResultatDto = {
  spørsmålId: string;
  tekst: string;
  flervalg: boolean;
  svarListe: SvarResultatDto[];
  kategori: string;
};
