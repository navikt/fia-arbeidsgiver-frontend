"use client";

export type SpørreundersøkelseType = {
  tiltak: string;
  hensikt: string;
  spørsmål: SpørsmålType[];
};

export type SpørsmålType = {
  id: string;
  spørsmål: string;
  svaralternativer: Svaralternativ[];
};

type Svaralternativ = {
  id: string;
  tekst: string;
};
