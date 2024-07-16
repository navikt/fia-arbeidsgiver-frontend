import { SpørsmålResultatDto } from "@/app/_types/SpørsmålResultatDto";

export type TemaResultatDto = {
  id: number;
  navn: string;
  spørsmål: SpørsmålResultatDto[];
};
