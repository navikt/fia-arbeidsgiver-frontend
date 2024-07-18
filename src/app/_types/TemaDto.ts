import { TemaStatus } from "@/app/_types/TemaStatus";
import { SpørsmålDto } from "@/app/_types/SpørsmålDto";

export type TemaDto = {
  id: number;
  del: number;
  navn: string;
  status: TemaStatus;
  førsteSpørsmålId: string;
  nesteTemaId?: number;
  spørsmål: SpørsmålDto[];
};
