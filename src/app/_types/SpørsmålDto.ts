import { SvaralternativDto } from "@/app/_types/SvaralternativDto";

export type SpørsmålDto = {
  id: string;
  tekst: string;
  flervalg: boolean;
  kategori?: string;
  svaralternativer: SvaralternativDto[];
};
