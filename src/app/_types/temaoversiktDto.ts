import { TemaStatus } from "@/app/_types/tema";

export type TemaoversiktDto = {
  tittel: string;
  temanavn: string;
  temaId: number;
  del: number;
  beskrivelse: string;
  introtekst: string;
  førsteSpørsmålId: string;
  status: TemaStatus;
};
