import { SpørsmålDTO } from "@/app/_types/SpørsmålDTO";
import { bliMedDTO } from "@/app/_types/bliMedDTO";
import { antallSvarDTO } from "@/app/_types/antallDeltakereDTO";
import {
  SpørreundersøkelseStatusDTO,
  TemaStatusDTO,
} from "@/app/_types/SpørreundersøkelseStatusDTO";

const dummySpørsmål1: SpørsmålDTO = {
  spørsmålId: "ef4d406d-abc2-4ed6-8de7-72a7feb40326",
  tematittel: "PARTSSAMARBEID",
  spørsmålNummer: 1,
  antallSpørsmålTema: 3,
  spørsmåltekst:
    "Hvilke av disse faktorene tror du har størst innflytelse på sykefraværet der du jobber?",
  svaralternativer: [
    {
      svarId: "fbc953f1-e7fe-472d-b069-7698c4cae0a5",
      svartekst: "Arbeidsbelastning",
    },
    {
      svarId: "c7c0e3b2-7ef3-4256-91b8-628a333942dc",
      svartekst: "Arbeidstid",
    },
    {
      svarId: "4d4680e5-1db7-42f4-b9ce-3a3a159595c9",
      svartekst: "Arbeidsforhold",
    },
    {
      svarId: "cb8c209b-9a73-490a-8fc7-def1c9f8d7db",
      svartekst: "Ledelse",
    },
    {
      svarId: "2c11ed86-d7c9-415b-9ca0-42499a0cda61",
      svartekst: "Noe annet",
    },
  ],
};

const dummySpørsmål2: SpørsmålDTO = {
  spørsmålId: "153e4d26-3c89-4097-9ddb-5cfef99bc4e9",
  tematittel: "PARTSSAMARBEID",
  spørsmålNummer: 2,
  antallSpørsmålTema: 3,
  spørsmåltekst:
    "Velg det tiltaket som du mener best kan bidra til å forebygge sykefraværet",
  svaralternativer: [
    {
      svarId: "867f3ba8-8cc2-43e7-b6ef-43abb17d5609",
      svartekst: "Bedre oppfølging av ansatte",
    },
    {
      svarId: "61b90749-4824-40c6-a99c-1bc3becfd48a",
      svartekst: "Tilrettelegging av arbeidsoppgaver",
    },
    {
      svarId: "a2786210-9004-4540-b2c7-64a28b59c448",
      svartekst: "Kompetanseutvikling",
    },
    {
      svarId: "db5f5b9d-928b-4485-9412-a256c233a83b",
      svartekst: "Helsefremmende aktiviteter",
    },
    { svarId: "70121318-4ff0-4bff-af75-39018b0f5c3e", svartekst: "Noe annet" },
  ],
};

const dummySpørsmål3: SpørsmålDTO = {
  spørsmålId: "37294476-815b-4ed5-90ea-8189a6bc48e8",
  tematittel: "PARTSSAMARBEID",
  spørsmålNummer: 3,
  antallSpørsmålTema: 3,
  spørsmåltekst:
    "Vi har kunnskap og ferdigheter til å gjennomføre forbedringstiltak i virksomheten (planlegge tiltak , gjennomføre og evaluere måloppnåelse)",
  svaralternativer: [
    {
      svarId: "a5f6656c-9659-4f94-bfb3-d4c3ae006800",
      svartekst: "Helt uening",
    },
    {
      svarId: "0e724ae3-62c2-4164-9709-0ae651e3e902",
      svartekst: "Litt uening",
    },
    {
      svarId: "b689cbc5-13f9-4c36-9a65-ef436e4496db",
      svartekst: "Litt ening",
    },
    {
      svarId: "c350140f-8c70-4cde-a29d-1b78979f88b1",
      svartekst: "Veldig ening",
    },
    {
      svarId: "411e0247-0e52-4757-8ab7-a71f9f00b81e",
      svartekst: "Vet ikke",
    },
  ],
};

const dummyPartssamarbeidstatusFerdig: TemaStatusDTO = {
  antallSpørsmål: 7,
  gjeldendeSpørsmålnummer: 3,
  status: "FULLFØRT",
  tittel: "PARTSSAMARBEID",
};

const dummyPartssamarbeidstatus: TemaStatusDTO = {
  antallSpørsmål: 7,
  gjeldendeSpørsmålnummer: 3,
  status: "PÅBEGYNT",
  tittel: "PARTSSAMARBEID",
};

const dummySykefraværstatus: TemaStatusDTO = {
  antallSpørsmål: 6,
  gjeldendeSpørsmålnummer: 0,
  status: "IKKE_PÅBEGYNT",
  tittel: "SYKEFRAVÆRSARBEID",
};

export const dummySpørreundersøkelseStatus: SpørreundersøkelseStatusDTO = {
  status: "OPPRETTET",
  temaer: [
    dummyPartssamarbeidstatusFerdig,
    dummyPartssamarbeidstatus,
    dummySykefraværstatus,
  ],
  antallDeltakere: 3,
};

export const dummySpørreundersøkelse = [
  dummySpørsmål1,
  dummySpørsmål2,
  dummySpørsmål3,
];

export const dummyBliMed: bliMedDTO = {
  spørreundersøkelseId: "f7065ba4-56ed-4f61-8215-7579e3d208de",
  sesjonsId: "790fba4d-1c9f-4c20-a019-d574d9542421",
};

export const dummyAntallSvar: antallSvarDTO = {
  antallSvar: 2,
  antallDeltakere: 3,
};

module.exports = {
  dummySpørreundersøkelseStatus,
  dummySpørreundersøkelse,
  dummyAntallSvar,
  dummyBliMed,
};
