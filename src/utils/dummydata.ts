import { KartleggingsType } from "./typer";

export const dummySpørsmål: KartleggingsType = {
  tiltak: "Testspørsmål",
  hensikt: "Hensikt bak hvorfor vi spør om disse spørsmålene",
  spørsmål: [
    {
      id: "3-1",
      spørsmål: "Et spørsmål med to alternativer",
      svaralternativer: [
        { id: "3-1-1", tekst: "A" },
        { id: "3-1-2", tekst: "B" },
      ],
    },
    {
      id: "3-2",
      spørsmål: "Ananas på pizza?",
      svaralternativer: [
        { id: "3-2-1", tekst: "JA" },
        { id: "3-2-2", tekst: "NEI" },
      ],
    },
    {
      id: "3-3",
      spørsmål: "A, B, C eller D?",
      svaralternativer: [
        { id: "3-3-1", tekst: "A" },
        { id: "3-3-2", tekst: "B" },
        { id: "3-3-3", tekst: "C" },
        { id: "3-3-4", tekst: "D" },
      ],
    },
  ],
};

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
