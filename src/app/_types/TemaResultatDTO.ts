export type TemaResultatDTO = {
  temaId: number;
  tema: string;
  beskrivelse: string;
  spørsmålMedSvar: SpørsmålMedSvarDTO[];
};

export type SpørsmålMedSvarDTO = {
  tekst: string;
  svarListe: SvarDTO[];
};

export type SvarDTO = {
  tekst: string;
  antallSvar: number;
};
