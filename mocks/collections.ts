const collections = [
  // {
  //   id: "base-old",
  //   routes: [
  //     "start-tema-route:success",
  //     "bli-med-route:kan-bli-med",
  //     "svar-route:success",
  //     "sporsmal-og-svar-vert-route:success",
  //     "sporsmal-og-svar-id-route:success",
  //     "neste-sporsmal-route:åpen",
  //     "inkrementer-sporsmal-route:success",
  //     "temastatus-route:opprettet",
  //   ],
  // },
  {
    id: "base",
    routes: [
      "start-tema-route:success",
      "sporsmal-og-svar-vert-route:success",
      "sporsmal-og-svar-id-route:success",
      "neste-sporsmal-route:åpen",
      "inkrementer-sporsmal-route:success",
      "temastatus-route:opprettet",
      // -------- NYE UNDER --------
      "deltaker-forste-sporsmal:success",
      "deltaker-sporsmal-og-svar:success",
      "bli-med-route:kan-bli-med",
      "svar-route:success",
      "vert-antall-deltakere:success",
    ],
  },
  // {
  //   id: "api-rework",
  //   routes: [
  //     "vert-liste-over-tema:success",
  //     "vert-sporsmal-og-svar:success",
  //     "vert-antall-som-har-svart:en-har-svart",
  //     "deltaker-forste-sporsmal:success",
  //     "deltaker-sporsmal-og-svar:success",
  //     "deltaker-bli-med:success",
  //   ],
  // },
];

export default collections;
