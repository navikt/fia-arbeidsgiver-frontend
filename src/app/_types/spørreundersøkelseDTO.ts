export type spørreundersøkelseDTO = {
  id: string;
  spørsmål: string;
  svaralternativer: svaralternativDTO[];
}[];

export type svaralternativDTO = {
  id: string;
  tekst: string;
};
