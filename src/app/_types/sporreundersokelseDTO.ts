export type spørreundersøkelseDTO = spørsmålDTO[];

export type spørsmålDTO = {
  spørsmålId: string;
  spørsmål: string;
  svaralternativer: svaralternativDTO[];
};

export type spørsmålIndeksDTO = {
  spørreundersøkelseId: string;
  indeks: number;
};

export type svaralternativDTO = {
  svarId: string;
  tekst: string;
};

export type kategoristatusDTO = {
  kategori: string;
  status: string;
  spørsmålindeks: number | null;
};
