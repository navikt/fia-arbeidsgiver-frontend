import { Tema } from "@/app/_types/tema";

export type TemaoversiktDto = {
  tittel: string;
  temaId: Tema;
  beskrivelse: string;
  introtekst: string;
  førsteSpørsmålId: string;
};
