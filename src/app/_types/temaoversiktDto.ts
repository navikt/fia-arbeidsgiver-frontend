import { Tema } from "@/app/_types/tema";

export type TemaoversiktDto = {
  tittel: string;
  temanavn: string;
  temaId: Tema;
  del: number;
  beskrivelse: string;
  introtekst: string;
  førsteSpørsmålId: string;
};
