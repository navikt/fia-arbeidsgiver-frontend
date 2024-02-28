export type nesteStegType = "NYTT_SPØRSMÅL" | "FERDIG";

export type nesteSpørsmålDTO = {
  hvaErNesteSteg: nesteStegType;
  erNesteÅpnetAvVert: boolean;
  nesteSpørsmålId: string | null;
  forrigeSpørsmålId: string | null;
};
