import { SpørsmålType } from "./typer";

export const spørsmålsliste: SpørsmålType[] = [
  {
    id: "1",
    spørsmål: "Hvordan har du det?",
    svaralternativer: [
      { id: "1", tekst: "Bra" },
      { id: "2", tekst: "Dårlig" },
    ],
  },
  {
    id: "2",
    spørsmål: "Hvordan har du det?sadfasz<",
    svaralternativer: [
      { id: "1", tekst: "Braegwegw" },
      { id: "2", tekst: "Dårligegrdfsz" },
    ],
  },
  {
    id: "3",
    spørsmål: "Hvordan har du det?44444",
    svaralternativer: [
      { id: "1", tekst: "123" },
      { id: "2", tekst: "321" },
      { id: "3", tekst: "456" },
      { id: "4", tekst: "654" },
    ],
  },
];

export const eksempelFraBackend: SpørsmålType[] = [
  {
    id: "a1b875ef-89a3-4040-8553-9f6fef4864e2",
    spørsmål: "Hva gjør dere med IA?",
    svaralternativer: [
      { id: "af5688db-9453-4232-87e3-ebee1c5788ad", tekst: "ingenting" },
      { id: "0e94e520-7857-4fe5-bcfe-8840cb3de0bc", tekst: "alt" },
    ],
  },
  {
    id: "a1b875ef-89a3-4040-8553-9f6fef4864e2",
    spørsmål: "Hva gjør dere med IA?",
    svaralternativer: [
      { id: "af5688db-9453-4232-87e3-ebee1c5788ad", tekst: "ingenting" },
      { id: "0e94e520-7857-4fe5-bcfe-8840cb3de0bc", tekst: "alt" },
    ],
  },
];
