export type spørreundersøkelseDTO = spørsmålDTO[];

export type spørsmålDTO = {
  id: string;
  spørsmål: string;
  svaralternativer: svaralternativDTO[];
};

export type spørsmålIndeksDTO = {
  spørreundersøkelseId: string;
  indeks: number;
};

export type svaralternativDTO = {
  id: string;
  tekst: string;
};
