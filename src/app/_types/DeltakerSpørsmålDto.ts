import { IdentifiserbartSpørsmålDto } from "@/app/_types/IdentifiserbartSpørsmålDto";
import { SpørsmålDto } from "@/app/_types/SpørsmålDto";

export type DeltakerSpørsmålDto = {
  spørsmål: SpørsmålDto;
  spørsmålnummer: number;
  antallSpørsmål: number;
  temanummer: number;
  antallTema: number;
  temanavn: string;
  nesteSpørsmål: IdentifiserbartSpørsmålDto | null;
  forrigeSpørsmål: IdentifiserbartSpørsmålDto | null;
};
