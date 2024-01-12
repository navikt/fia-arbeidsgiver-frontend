"use client";
export type SpørsmålType = {
  id: string;
  spørsmål: string;
  svaralternativer: Svaralternativ[];
};
type Svaralternativ = {
  id: string;
  tekst: string;
};
