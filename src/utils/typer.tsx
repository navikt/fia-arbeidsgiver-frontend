"use client";

export type KartleggingsType = {
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
