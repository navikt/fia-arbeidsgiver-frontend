import { SpørsmålResultatDto } from "@/app/_types/SpørsmålResultatDto";

export type TemaResultatDto = {
  temaId: number;
  beskrivelse: string | null;
  tema: string | null;
  navn: string | null;
  spørsmålMedSvar: SpørsmålResultatDto[];
};

