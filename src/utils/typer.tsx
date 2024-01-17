"use client";

export type Kartlegging = {
  møtenr: number;
  virksomhetsnavn: string;
  kategori: KartleggingsKategori[];
};

export type KartleggingsKategori = {
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
