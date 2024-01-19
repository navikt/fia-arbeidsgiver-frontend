import { spørreundersøkelseDTO } from "@/app/_types/sporreundersokelseDTO";
import { KartleggingsType } from "./typer";
import { bliMedDTO } from "@/app/_types/bliMedDTO";

export const dummySpørreundersøkelse: spørreundersøkelseDTO = [
  {
    id: "ef4d406d-abc2-4ed6-8de7-72a7feb40326",
    spørsmål:
      "Hvilke av disse faktorene tror du har størst innflytelse på sykefraværet der du jobber?",
    svaralternativer: [
      {
        id: "fbc953f1-e7fe-472d-b069-7698c4cae0a5",
        tekst: "Arbeidsbelastning",
      },
      { id: "c7c0e3b2-7ef3-4256-91b8-628a333942dc", tekst: "Arbeidstid" },
      { id: "4d4680e5-1db7-42f4-b9ce-3a3a159595c9", tekst: "Arbeidsforhold" },
      { id: "cb8c209b-9a73-490a-8fc7-def1c9f8d7db", tekst: "Ledelse" },
      { id: "2c11ed86-d7c9-415b-9ca0-42499a0cda61", tekst: "Noe annet" },
    ],
  },
  {
    id: "153e4d26-3c89-4097-9ddb-5cfef99bc4e9",
    spørsmål:
      "Velg det tiltaket som du mener best kan bidra til å forebygge sykefraværet",
    svaralternativer: [
      {
        id: "867f3ba8-8cc2-43e7-b6ef-43abb17d5609",
        tekst: "Bedre oppfølging av ansatte",
      },
      {
        id: "61b90749-4824-40c6-a99c-1bc3becfd48a",
        tekst: "Tilrettelegging av arbeidsoppgaver",
      },
      {
        id: "a2786210-9004-4540-b2c7-64a28b59c448",
        tekst: "Kompetanseutvikling",
      },
      {
        id: "db5f5b9d-928b-4485-9412-a256c233a83b",
        tekst: "Helsefremmende aktiviteter",
      },
      { id: "70121318-4ff0-4bff-af75-39018b0f5c3e", tekst: "Noe annet" },
    ],
  },
  {
    id: "37294476-815b-4ed5-90ea-8189a6bc48e8",
    spørsmål:
      "Vi har kunnskap og ferdigheter til å gjennomføre forbedringstiltak i virksomheten (planlegge tiltak , gjennomføre og evaluere måloppnåelse)",
    svaralternativer: [
      { id: "a5f6656c-9659-4f94-bfb3-d4c3ae006800", tekst: "Helt uening" },
      { id: "0e724ae3-62c2-4164-9709-0ae651e3e902", tekst: "Litt uening" },
      { id: "b689cbc5-13f9-4c36-9a65-ef436e4496db", tekst: "Litt ening" },
      { id: "c350140f-8c70-4cde-a29d-1b78979f88b1", tekst: "Veldig ening" },
      { id: "411e0247-0e52-4757-8ab7-a71f9f00b81e", tekst: "Vet ikke" },
    ],
  },
];

export const dummyBliMed: bliMedDTO = {
  spørreundersøkelseId: "f7065ba4-56ed-4f61-8215-7579e3d208de",
  sesjonsId: "790fba4d-1c9f-4c20-a019-d574d9542421",
};

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
