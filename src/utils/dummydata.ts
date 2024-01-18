import { spørreundersøkelseDTO } from "@/app/_types/spørreundersøkelseDTO";
import { KartleggingsType } from "./typer";
import { bliMedDTO } from "@/app/_types/bliMedDTO";

export const dummySpørreundersøkelse: spørreundersøkelseDTO = [
  {
    id: "ab0fa573-2fde-4bdb-8913-aa3ef7d774df",
    spørsmål: "Et spørsmål med to alternativer",
    svaralternativer: [
      { id: "cab2214b-975b-412b-9524-7f9e908c6f31", tekst: "A" },
      { id: "fb8bc8e5-ad82-4de8-860e-21a218cdac13", tekst: "B" },
    ],
  },
  {
    id: "a9f2d339-bbcd-4651-9794-fa5740c4edb8",
    spørsmål: "Ananas på pizza?",
    svaralternativer: [
      { id: "be9c44d6-f4bb-44fb-b4e4-d363e13f39f1", tekst: "JA" },
      { id: "517f047a-91c9-44ed-950a-c1f628118a69", tekst: "NEI" },
    ],
  },
  {
    id: "903371a4-14cf-4a03-8e00-a50392bf351e",
    spørsmål: "A, B, C eller D?",
    svaralternativer: [
      { id: "710f032f-7d50-4b0c-af98-aed20706f9f0", tekst: "A" },
      { id: "1d50bd61-ca2a-4173-84ee-24ee742e0cf0", tekst: "B" },
      { id: "4be0b0a5-28e8-4403-8392-414ec290e473", tekst: "C" },
      { id: "56aa0482-da92-416d-88ac-1e96d96d20a3", tekst: "D" },
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
