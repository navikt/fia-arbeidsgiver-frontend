import { KartleggingsType, SpørsmålType } from "./typer";

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

export const partssamarbeid: KartleggingsType = {
  tiltak: "Partssamarbeid",
  hensikt:
    "Få et bilde av hvordan partsgruppen jobber med det forebyggende sykefraværsarbeidet",
  spørsmål: [
    {
      id: "1-1",
      spørsmål:
        "Hvilke av disse faktorene tror du har størst innflytelse på sykefraværet der du jobber?",
      svaralternativer: [
        { id: "1-1-1", tekst: "Arbeidsbelastning" },
        { id: "1-1-2", tekst: "Arbeidstid" },
        { id: "1-1-3", tekst: "Arbeidsforhold" },
        { id: "1-1-4", tekst: "Ledelse" },
        { id: "1-1-5", tekst: "Noe annet" },
      ],
    },
    {
      id: "1-2",
      spørsmål:
        "Velg det tiltaket som du mener best kan bidra til å forebygge sykefraværet",
      svaralternativer: [
        { id: "1-2-1", tekst: "Bedre oppfølging av ansatte" },
        { id: "1-2-2", tekst: "Tilrettelegging av arbeidsoppgaver" },
        { id: "1-2-3", tekst: "Kompetanseutvikling" },
        { id: "1-2-4", tekst: "Helsefremmende aktiviteter" },
        { id: "1-2-5", tekst: "Noe annet" },
      ],
    },
  ],
};

export const sykefraværsarbeid: KartleggingsType = {
  tiltak: "Sykefravæversarbeid",
  hensikt:
    "Få et bilde av hvordan partsgruppen jobber med det forebyggende sykefraværsarbeidet",
  spørsmål: [
    {
      id: "2-1",
      spørsmål: "Hvor fornøyd er du med sykefraværsrutinen i virksomheten",
      svaralternativer: [
        { id: "2-1-1", tekst: "Svært misfornøyd" },
        { id: "2-1-2", tekst: "Misfornøyd" },
        { id: "2-1-3", tekst: "Litt misfornøyd" },
        { id: "2-1-4", tekst: "Litt fornøyd" },
        { id: "2-1-5", tekst: "Fornøyd" },
        { id: "2-1-6", tekst: "Svært fornøyd" },
      ],
    },
    {
      id: "2-2",
      spørsmål:
        "Hvor ofte har partsgruppen felles gjennomgang av sykefravæeret i virksomheten?",
      svaralternativer: [
        { id: "2-2-1", tekst: "Aldri" },
        { id: "2-2-2", tekst: "Sjelden (1-2 ganger i året)" },
        { id: "2-2-3", tekst: "Av og til (3-4 ganger i året)" },
        { id: "2-2-4", tekst: "Ofte (ca. hver måned)" },
      ],
    },
  ],
};
