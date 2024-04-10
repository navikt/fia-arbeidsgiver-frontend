export type temaResultatDTO = {
  tema: string;
  beskrivelse: string;
  spørsmålMedSvar: spørsmålMedSvarDTO[];
};

export type spørsmålMedSvarDTO = {
  tekst: string;
  svarListe: svarDTO[];
};

export type svarDTO = {
  tekst: string;
  antallSvar: number;
};
