export const enum navigasjonstype {
  SPØRSMÅL = "SPØRSMÅL",
  FULLFØRT = "FULLFØRT",
  TEMA = "TEMA",
  START = "START",
}

export type sporsmalOgSvarDTO = {
  id: string;
  spørsmål: string;
  svaralternativer: svaralternativDTO[];
  nesteId?: string;
  nesteType: navigasjonstype;
  forrigeId?: string;
  forrigeType: navigasjonstype;
};
export type svaralternativDTO = {
  id: string;
  tekst: string;
};
