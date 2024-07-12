import { SpørsmålResultatDto } from "@/app/_types/SpørsmålResultatDto";

export type TemaResultatDto = {
  temaId: number;
  navn: string;
  spørsmålMedSvar: SpørsmålResultatDto[];
};
