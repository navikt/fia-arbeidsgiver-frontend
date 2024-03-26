const dummySpørreundersøkelseId = "5164abc8-9e4c-408d-8790-ce7f7f3c4658";
const temabeskrivelsePartssamarbeid = "Utvikle partsamarbeidet i virksomheten";
const temabeskrivelseSykefravær = "Redusere sykefravær i virksomheten";

const førsteTemaFørsteSpørsmål = {
  temaId: 1,
  spørsmålId: "b16c4b1c-b45e-470d-a1a5-d6f87424d410",
};

const førsteTemaAndreSpørsmål = {
  temaId: 1,
  spørsmålId: "61a9a84a-949b-4f46-97e5-c9b60e01d433",
};

const førsteTemaTredjeSpørsmål = {
  temaId: 1,
  spørsmålId: "62b3a863-cba3-4c92-8c7e-19d8b4688d49",
};

const andreTemaFørsteSpørsmål = {
  temaId: 2,
  spørsmålId: "5df90163-81e4-44c5-8e72-9b47f2added2",
};

const dummyFørsteSpørsmål = {
  temabeskrivelse: temabeskrivelsePartssamarbeid,
  spørsmålTekst:
    "Hvilke av disse faktorene tror du har størst innflytelse på sykefraværet der du jobber?",
  svaralternativer: [
    {
      svarId: "e1866063-4e4f-4a49-924e-cbcd9bd76ac1",
      svartekst: "Arbeidsbelastning",
    },
    {
      svarId: "7e25c7a3-c4fb-47fd-84b5-2aea747f0971",
      svartekst: "Arbeidstid",
    },
    {
      svarId: "399a0bca-4eb5-4f7f-bbd2-222a50886b54",
      svartekst: "Arbeidsforhold",
    },
    {
      svarId: "e7329227-2af9-43c9-aa03-add8e7ea841b",
      svartekst: "Ledelse",
    },
    {
      svarId: "34d8705c-0c8a-4be0-a013-16755f90c8fc",
      svartekst: "Noe annet",
    },
  ],
  forrigeSpørsmål: null,
  nesteSpørsmål: førsteTemaAndreSpørsmål,
  spørsmålnummer: 1,
  antallSpørsmål: 3,
  temanummer: 1,
  antallTema: 2,
};

const dummyAndreSpørsmål = {
  temabeskrivelse: temabeskrivelsePartssamarbeid,
  spørsmålTekst:
    "Velg det tiltaket som du mener best kan bidra til å forebygge sykefraværet",
  svaralternativer: [
    {
      svarId: "fec487a5-23fa-4ef1-85fc-b6f951813c7f",
      svartekst: "Bedre oppfølging av ansatte",
    },
    {
      svarId: "6e56c7ed-885a-4842-84f3-34a650e1cdf5",
      svartekst: "Tilrettelegging av arbeidsoppgaver",
    },
    {
      svarId: "e9368458-6610-48ca-a9be-966f038b6493",
      svartekst: "Kompetanseutvikling",
    },
    {
      svarId: "97ab7311-14d2-49d5-8d80-5df51e6d96cf",
      svartekst: "Helsefremmende aktiviteter",
    },
    {
      svarId: "f18aa9b2-eb18-459b-a9c9-01d616bdc77c",
      svartekst: "Noe annet",
    },
  ],
  forrigeSpørsmål: førsteTemaFørsteSpørsmål,
  nesteSpørsmål: førsteTemaTredjeSpørsmål,
  spørsmålnummer: 2,
  antallSpørsmål: 3,
  temanummer: 1,
  antallTema: 2,
};

const dummyTredjeSpørsmål = {
  temabeskrivelse: temabeskrivelsePartssamarbeid,
  spørsmålTekst:
    "Vi har kunnskap og ferdigheter til å gjennomføre forbedringstiltak i virksomheten (planlegge tiltak, gjennomføre og evaluere måloppnåelse)",
  svaralternativer: [
    {
      svarId: "bd81223c-4552-43f1-a51c-e45a604c691f",
      svartekst: "Helt uenig",
    },
    {
      svarId: "d12cde54-0e08-4e19-91e8-32ddf7ab8bf8",
      svartekst: "Litt uenig",
    },
    {
      svarId: "17eb8810-d2f6-43e9-8cd8-2caf346c93be",
      svartekst: "Litt enig",
    },
    {
      svarId: "77bfcbd8-343d-4794-bc6e-9d73037e322c",
      svartekst: "Veldig enig",
    },
    {
      svarId: "24f1282b-7858-4f56-b1d7-959a39811f52",
      svartekst: "Vet ikke",
    },
  ],
  forrigeSpørsmål: førsteTemaAndreSpørsmål,
  nesteSpørsmål: andreTemaFørsteSpørsmål,
  spørsmålnummer: 3,
  antallSpørsmål: 3,
  temanummer: 1,
  antallTema: 2,
};

const dummyFjerdeSpørsmål = {
  temabeskrivelse: temabeskrivelseSykefravær,
  spørsmålTekst:
    "I hvilken grad jobber dere med tilrettelegging og tilpasning av arbeid?",
  svaralternativer: [
    {
      svarId: "92099422-5964-4716-a79b-86eb65e136f5",
      svartekst: "I stor grad",
    },
    {
      svarId: "bb547108-2594-418e-8f95-d911283b4eab",
      svartekst: "I noen grad",
    },
    {
      svarId: "a0d5d8b6-7f8f-46d2-b78e-6c8d49615a19",
      svartekst: "I liten grad",
    },
    {
      svarId: "e183fbcc-632b-41d9-95fa-57478e1a9c54",
      svartekst: "Vet ikke",
    },
  ],
  forrigeSpørsmål: førsteTemaTredjeSpørsmål,
  nesteSpørsmål: null,
  spørsmålnummer: 1,
  antallSpørsmål: 1,
  temanummer: 2,
  antallTema: 2,
};

const dummySpørsmålSamling = {
  [førsteTemaFørsteSpørsmål.spørsmålId]: dummyFørsteSpørsmål,
  [førsteTemaAndreSpørsmål.spørsmålId]: dummyAndreSpørsmål,
  [førsteTemaTredjeSpørsmål.spørsmålId]: dummyTredjeSpørsmål,
  [andreTemaFørsteSpørsmål.spørsmålId]: dummyFjerdeSpørsmål,
};

module.exports = {
  førsteTemaFørsteSpørsmål,
  førsteTemaAndreSpørsmål,
  førsteTemaTredjeSpørsmål,
  andreTemaFørsteSpørsmål,
  dummyFørsteSpørsmål,
  dummyAndreSpørsmål,
  dummyTredjeSpørsmål,
  dummyFjerdeSpørsmål,
  dummySpørreundersøkelseId,
  dummySpørsmålSamling,
};
