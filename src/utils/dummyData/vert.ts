const dummyVertId = "797bdcd0-98e7-40da-9cad-5f03a349517a";

const dummyTemaoversiktUtviklePartssamarbeid = {
  tittel: "UTVIKLE_PARTSSAMARBEID",
  temanavn: "UTVIKLE_PARTSSAMARBEID",
  temaId: 1,
  del: 1,
  beskrivelse: "Utvikle partsamarbeidet i virksomheten",
  introtekst:
    'Partssamarbeid er essensielt i virksomheter fordi det bidrar til et godt forebyggende arbeidsmiljø og reduksjon av antall tapte dagsverk. Partssamarbeidet anerkjenner og utnytter kompetansen og ansvarsområdene til verneombud, tillitsvalgte og ledere, noe som skaper en "utvidet ledelseskapasitet".',
  førsteSpørsmålId: "b16c4b1c-b45e-470d-a1a5-d6f87424d410",
  status: "ÅPNET",
};

const dummyTemaoversiktRedusereSykefravær = {
  tittel: "REDUSERE_SYKEFRAVÆR",
  temanavn: "REDUSERE_SYKEFRAVÆR",
  temaId: 2,
  del: 2,
  beskrivelse: "Redusere sykefravær i virksomheten",
  introtekst:
    "Sykefravær er en viktig indikator for arbeidsmiljøet og ansattes helse. Å ha et bevisst forhold til sykefraværsarbeid på arbeidsplassen er avgjørende for å skape et trivelig og produktivt arbeidsmiljø. Gjennom kartlegging kan man identifisere mønstre, sette mål og implementere tiltak for å redusere sykefraværet. Dette bidrar til et bedre arbeidsmiljø og økt trivsel for alle ansatte.",
  førsteSpørsmålId: "5df90163-81e4-44c5-8e72-9b47f2added2",
  status: "ÅPNET",
};

const dummySpørsmålMedSvarPerTema = [
  {
    temaId: 1,
    tema: "UTVIKLE_PARTSSAMARBEID",
    beskrivelse: "Utvikle partssamarbeidet i virksomheten",
    spørsmålMedSvar: [
      {
        tekst: "Hvor lenge har du vært en del av gruppen?",
        svarListe: [
          {
            tekst: "Mindre enn et år",
            antallSvar: 0,
          },
          {
            tekst: "1-2 år",
            antallSvar: 3,
          },
          {
            tekst: "2-4 år",
            antallSvar: 0,
          },
          {
            tekst: "Mer enn fire år",
            antallSvar: 0,
          },
        ],
      },
      {
        tekst: "Hvor ofte møtes dere?",
        svarListe: [
          {
            tekst: "1 - 2 ganger i året",
            antallSvar: 0,
          },
          {
            tekst: "3 - 5 ganger i året",
            antallSvar: 2,
          },
          {
            tekst: "6 - 10 ganger i året",
            antallSvar: 0,
          },
          {
            tekst: "Mer enn 10 ganger i året",
            antallSvar: 0,
          },
          {
            tekst: "Vet ikke",
            antallSvar: 1,
          },
        ],
      },
      {
        tekst:
          "Hvor godt kjenner dere til hverandres roller og ansvar i gruppen?",
        svarListe: [
          {
            tekst: "Godt",
            antallSvar: 1,
          },
          {
            tekst: "Hverken godt eller dårlig",
            antallSvar: 0,
          },
          {
            tekst: "Ikke så godt",
            antallSvar: 1,
          },
          {
            tekst: "Vet ikke",
            antallSvar: 1,
          },
        ],
      },
      {
        tekst: "Hvordan opplever du at samarbeidet i gruppen fungerer?",
        svarListe: [
          {
            tekst: "Bra",
            antallSvar: 1,
          },
          {
            tekst: "Hverken bra eller dårlig",
            antallSvar: 1,
          },
          {
            tekst: "Ikke så bra",
            antallSvar: 1,
          },
          {
            tekst: "Vet ikke",
            antallSvar: 0,
          },
        ],
      },
      {
        tekst: "I hvilken grad er du involvert i den daglige driften?",
        svarListe: [
          {
            tekst: "I stor grad",
            antallSvar: 1,
          },
          {
            tekst: "I noe grad",
            antallSvar: 1,
          },
          {
            tekst: "I liten grad",
            antallSvar: 0,
          },
          {
            tekst: "Vet ikke",
            antallSvar: 1,
          },
        ],
      },
      {
        tekst:
          "I hvilken grad er du involvert i å skape godt samarbeid på arbeidsplassen?",
        svarListe: [
          {
            tekst: "I stor grad",
            antallSvar: 2,
          },
          {
            tekst: "I noe grad",
            antallSvar: 0,
          },
          {
            tekst: "I liten grad",
            antallSvar: 1,
          },
          {
            tekst: "Vet ikke",
            antallSvar: 0,
          },
        ],
      },
      {
        tekst: "Hvilke temaer får størst prioritet i møtene deres?",
        svarListe: [
          {
            tekst: "Lønnsforhandlinger",
            antallSvar: 0,
          },
          {
            tekst: "HMS",
            antallSvar: 0,
          },
          {
            tekst: "Bemanning",
            antallSvar: 0,
          },
          {
            tekst: "Sykefravær",
            antallSvar: 1,
          },
          {
            tekst: "Arbeidsmiljø",
            antallSvar: 2,
          },
          {
            tekst: "Annet",
            antallSvar: 0,
          },
          {
            tekst: "Vet ikke",
            antallSvar: 0,
          },
        ],
      },
    ],
  },
  {
    temaId: 2,
    tema: "REDUSERE_SYKEFRAVÆR",
    beskrivelse: "Redusere sykefravær i virksomheten",
    spørsmålMedSvar: [
      {
        tekst:
          "I hvilken grad jobber dere med tilrettelegging og tilpasning av arbeid?",
        svarListe: [
          {
            tekst: "I stor grad",
            antallSvar: 1,
          },
          {
            tekst: "I noen grad",
            antallSvar: 0,
          },
          {
            tekst: "I liten grad",
            antallSvar: 1,
          },
          {
            tekst: "Vet ikke",
            antallSvar: 1,
          },
        ],
      },
    ],
  },
];

const dummyTemaoversikt = [
  dummyTemaoversiktUtviklePartssamarbeid,
  dummyTemaoversiktRedusereSykefravær,
];
module.exports = {
  dummySpørsmålMedSvarPerTema,
  dummyVertId,
  dummyTemaoversikt,
  dummyTemaoversiktRedusereSykefravær,
  dummyTemaoversiktUtviklePartssamarbeid,
};
