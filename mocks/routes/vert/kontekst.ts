// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_KONTEKST_URL } = require("@/utils/urls");

const kontekstRoutes = [
  {
    id: "vert-kontekst",
    url: API_VERT_KONTEKST_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: {
            type: "Behovsvurdering",
            virksomhetsnavn: "Fisk og flesk AS",
            samarbeidsnavn: null,
          },
        },
      },
      {
        id: "success-evaluering-uten-syk",
        type: "json",
        options: {
          status: 200,
          body: {
            "type": "Evaluering",
            "virksomhetsnavn": "RYDDIG UTAKKNEMLIG TIGER AS",
            "samarbeidsnavn": "RYDDIG UTAKKNEMLIG TIGER AS",
            "plan": {
                "id": "eb08212b-9185-4cd7-bd80-95c410faf575",
                "sistEndret": "2024-11-20T12:42:56.716350",
                "sistPublisert": null,
                "temaer": [
                    {
                        "id": 79,
                        "navn": "Partssamarbeid",
                        "inkludert": true,
                        "undertemaer": [
                            {
                                "id": 276,
                                "navn": "Utvikle partssamarbeidet",
                                "målsetning": "Styrke og strukturere samarbeidet mellom leder, tillitsvalgt og verneombud, samt øke kunnskap og ferdigheter for å jobbe systematisk og forebyggende med sykefravær og arbeidsmiljø.",
                                "inkludert": true,
                                "status": "PÅGÅR",
                                "startDato": "2024-11-20",
                                "sluttDato": "2024-12-20"
                            }
                        ]
                    },
                    {
                        "id": 80,
                        "navn": "Sykefraværsarbeid",
                        "inkludert": false,
                        "undertemaer": [
                            {
                                "id": 277,
                                "navn": "Sykefraværsrutiner",
                                "målsetning": "Jobbe systematisk og forebyggende med sykefravær, samt forbedre rutiner og oppfølging av ansatte som er sykmeldte eller står i fare for å bli det.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            },
                            {
                                "id": 278,
                                "navn": "Oppfølgingssamtaler",
                                "målsetning": "Øke kompetanse og ferdigheter for hvordan man gjennomfører gode oppfølgingssamtaler, både gjennom teori og praksis.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            },
                            {
                                "id": 279,
                                "navn": "Tilretteleggings- og medvirkningsplikt",
                                "målsetning": "Utvikle rutiner og kultur for tilrettelegging og medvirkning, samt kartlegging av tilretteleggingsmuligheter på arbeidsplassen.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            },
                            {
                                "id": 280,
                                "navn": "Sykefravær - enkeltsaker",
                                "målsetning": "Øke kompetanse og ferdigheter for hvordan man tar tak i, følger opp og løser enkeltsaker.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            }
                        ]
                    },
                    {
                        "id": 81,
                        "navn": "Arbeidsmiljø",
                        "inkludert": true,
                        "undertemaer": [
                            {
                                "id": 281,
                                "navn": "Utvikle arbeidsmiljøet",
                                "målsetning": "Øke anvendelse og kompetanse innen verktøy og bransjerettet kunnskap for å jobbe målrettet og kunnskapsbasert med eget arbeidsmiljø.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            },
                            {
                                "id": 283,
                                "navn": "Oppfølging av arbeidsmiljøundersøkelser",
                                "målsetning": "Øke ferdigheter og gi støtte til hvordan man kan jobbe med forhold på arbeidsplassen som belyses i egne arbeidsmiljøundersøkelser.",
                                "inkludert": true,
                                "status": "PÅGÅR",
                                "startDato": "2024-11-01",
                                "sluttDato": "2024-12-05"
                            },
                            {
                                "id": 284,
                                "navn": "Livsfaseorientert personalpolitikk",
                                "målsetning": "Utvikle kultur og personalpolitikk som ivaretar medarbeideres ulike behov, krav, begrensninger og muligheter i ulike livsfaser.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            },
                            {
                                "id": 285,
                                "navn": "Psykisk helse",
                                "målsetning": "Gi innsikt i hvordan psykiske utfordringer kan komme til uttrykk i arbeidshverdagen og øke ferdigheter for hvordan man møter medarbeidere med psykiske helseutfordringer.",
                                "inkludert": true,
                                "status": "PLANLAGT",
                                "startDato": "2024-12-05",
                                "sluttDato": "2024-12-20"
                            },
                            {
                                "id": 286,
                                "navn": "HelseIArbeid",
                                "målsetning": "Øke kompetansen og få ansatte til å mestre jobb, selv med muskel/skjelett- og psykiske helseplager.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            },
                            {
                                "id": 282,
                                "navn": "Endring og omstilling",
                                "målsetning": "Øke kompetansen for hvordan man ivaretar arbeidsmiljø og forebygger sykefravær under endring og omstilling.",
                                "inkludert": true,
                                "status": "FULLFØRT",
                                "startDato": "2024-10-01",
                                "sluttDato": "2024-11-15"
                            }
                        ]
                    }
                ]
            }
        },
        },
      },
      {
        id: "success-evaluering",
        type: "json",
        options: {
          status: 200,
          body: {
            type: "Evaluering",
            virksomhetsnavn: "Fisk og flesk AS",
            samarbeidsnavn: null,
            "plan": {
                "id": "ebb93a79-c662-4322-a9db-b09568727cfd",
                "sistEndret": "2024-11-15T13:50:07.050779",
                "sistPublisert": null,
                "temaer": [
                    {
                        "id": 502,
                        "navn": "Partssamarbeid",
                        "inkludert": true,
                        "undertemaer": [
                            {
                                "id": 1827,
                                "navn": "Utvikle partssamarbeidet",
                                "målsetning": "Styrke og strukturere samarbeidet mellom leder, tillitsvalgt og verneombud, samt øke kunnskap og ferdigheter for å jobbe systematisk og forebyggende med sykefravær og arbeidsmiljø.",
                                "inkludert": true,
                                "status": "PLANLAGT",
                                "startDato": "2024-11-15",
                                "sluttDato": "2024-12-15"
                            }
                        ]
                    },
                    {
                        "id": 503,
                        "navn": "Sykefraværsarbeid",
                        "inkludert": true,
                        "undertemaer": [
                            {
                                "id": 1828,
                                "navn": "Sykefraværsrutiner",
                                "målsetning": "Jobbe systematisk og forebyggende med sykefravær, samt forbedre rutiner og oppfølging av ansatte som er sykmeldte eller står i fare for å bli det.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            },
                            {
                                "id": 1829,
                                "navn": "Oppfølgingssamtaler",
                                "målsetning": "Øke kompetanse og ferdigheter for hvordan man gjennomfører gode oppfølgingssamtaler, både gjennom teori og praksis.",
                                "inkludert": true,
                                "status": "PLANLAGT",
                                "startDato": "2024-11-15",
                                "sluttDato": "2024-12-15"
                            },
                            {
                                "id": 1830,
                                "navn": "Tilretteleggings- og medvirkningsplikt",
                                "målsetning": "Utvikle rutiner og kultur for tilrettelegging og medvirkning, samt kartlegging av tilretteleggingsmuligheter på arbeidsplassen.",
                                "inkludert": true,
                                "status": "PLANLAGT",
                                "startDato": "2024-11-15",
                                "sluttDato": "2024-12-15"
                            },
                            {
                                "id": 1831,
                                "navn": "Sykefravær - enkeltsaker",
                                "målsetning": "Øke kompetanse og ferdigheter for hvordan man tar tak i, følger opp og løser enkeltsaker.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            }
                        ]
                    },
                    {
                        "id": 504,
                        "navn": "Arbeidsmiljø",
                        "inkludert": true,
                        "undertemaer": [
                            {
                                "id": 1832,
                                "navn": "Utvikle arbeidsmiljøet",
                                "målsetning": "Øke anvendelse og kompetanse innen verktøy og bransjerettet kunnskap for å jobbe målrettet og kunnskapsbasert med eget arbeidsmiljø.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            },
                            {
                                "id": 1833,
                                "navn": "Endring og omstilling",
                                "målsetning": "Øke kompetansen for hvordan man ivaretar arbeidsmiljø og forebygger sykefravær under endring og omstilling.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            },
                            {
                                "id": 1834,
                                "navn": "Oppfølging av arbeidsmiljøundersøkelser",
                                "målsetning": "Øke ferdigheter og gi støtte til hvordan man kan jobbe med forhold på arbeidsplassen som belyses i egne arbeidsmiljøundersøkelser.",
                                "inkludert": true,
                                "status": "PLANLAGT",
                                "startDato": "2024-11-15",
                                "sluttDato": "2024-12-15"
                            },
                            {
                                "id": 1835,
                                "navn": "Livsfaseorientert personalpolitikk",
                                "målsetning": "Utvikle kultur og personalpolitikk som ivaretar medarbeideres ulike behov, krav, begrensninger og muligheter i ulike livsfaser.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            },
                            {
                                "id": 1836,
                                "navn": "Psykisk helse",
                                "målsetning": "Gi innsikt i hvordan psykiske utfordringer kan komme til uttrykk i arbeidshverdagen og øke ferdigheter for hvordan man møter medarbeidere med psykiske helseutfordringer.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            },
                            {
                                "id": 1837,
                                "navn": "HelseIArbeid",
                                "målsetning": "Øke kompetansen og få ansatte til å mestre jobb, selv med muskel/skjelett- og psykiske helseplager.",
                                "inkludert": false,
                                "status": null,
                                "startDato": null,
                                "sluttDato": null
                            }
                        ]
                    }
                ]
            }
          },
        },
      },
      {
        id: "feil-i-uuid",
        type: "status",
        options: {
          status: 400,
        },
      },
      {
        id: "ugyldig-id",
        type: "status",
        options: {
          status: 403,
        },
      },
    ],
  },
];

export default kontekstRoutes;
