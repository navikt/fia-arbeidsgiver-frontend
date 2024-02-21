const dummySpørreundersøkelse = [
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

const dummyBliMed = {
  spørreundersøkelseId: "f7065ba4-56ed-4f61-8215-7579e3d208de",
  sesjonsId: "790fba4d-1c9f-4c20-a019-d574d9542421",
};
const dummyAntallDeltakere = {
  antallDeltakere: 3,
  antallSvar: [
    { spørsmålId: "fbc953f1-e7fe-472d-b069-7698c4cae0a5", antall: 1 },
    { spørsmålId: "153e4d26-3c89-4097-9ddb-5cfef99bc4e9", antall: 3 },
    { spørsmålId: "37294476-815b-4ed5-90ea-8189a6bc48e8", antall: 0 },
  ],
};

const dummySpørsmålIndeks = {
  spørreundersøkelseId: "ef4d406d-abc2-4ed6-8de7-72a7feb40326",
  indeks: 4,
};

const dummyKartleggingStatusOpprettet = {
  kategori: "PARTSSAMARBEID",
  status: "OPPRETTET",
  spørsmålindeks: null,
};

const dummyKartleggingStatusIkkePåbegynt = {
  kategori: "PARTSSAMARBEID",
  status: "IKKE_PÅBEGYNT",
  spørsmålindeks: null,
};

const dummyKartleggingStatusPåbegynt = {
  kategori: "PARTSSAMARBEID",
  status: "PÅBEGYNT",
  spørsmålindeks: 0,
};

module.exports = {
  dummySpørreundersøkelse,
  dummyBliMed,
  dummyAntallDeltakere,
  dummySpørsmålIndeks,
  dummyKartleggingStatusOpprettet,
  dummyKartleggingStatusIkkePåbegynt,
  dummyKartleggingStatusPåbegynt,
};
