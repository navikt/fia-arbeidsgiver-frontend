export type antallSvarDTO = {
  spørsmålId: string;
  antall: number;
};

export type antallDeltakereDTO = {
  antallDeltakere: number;
  antallSvar: antallSvarDTO[];
};
