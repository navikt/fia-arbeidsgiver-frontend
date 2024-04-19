import { temaResultatDTO } from "@/app/_types/resultatDTO";

export const dummySpørsmålMedSvarPerTema: temaResultatDTO[] = [
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
