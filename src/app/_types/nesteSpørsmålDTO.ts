export type nesteStegType = "NYTT_SPØRSMÅL" | "FERDIG";

export type nesteSpørsmålDTO = {
  hvaErNesteSteg: nesteStegType;
  erNesteÅpnetAvVert: boolean;
  nesteSporsmalId: string | null;
  forrigeSporsmalId: string | null;
};
