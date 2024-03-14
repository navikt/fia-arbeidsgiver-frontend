// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_UNDERSØKELSE_STATUS_URL } = require("@/utils/urls");

const antallSomErMedRoutes = [
  {
    id: "vert-antall-med",
    url: API_VERT_UNDERSØKELSE_STATUS_URL(),
    method: "POST",
    variants: [
      {
        id: "en-har-svart",
        type: "json",
        options: {
          status: 200,
          body: { antallMedIUndersøkelsen: 1 },
        },
      },
      {
        id: "tre-har-svart",
        type: "json",
        options: {
          status: 200,
          body: { antallMedIUndersøkelsen: 3 },
        },
      },
      {
        id: "fem-har-svart",
        type: "json",
        options: {
          status: 200,
          body: { antallMedIUndersøkelsen: 5 },
        },
      },
      {
        id: "feil",
        type: "status",
        options: {
          status: 400,
        },
      },
      {
        id: "ugyldig",
        type: "status",
        options: {
          status: 403,
        },
      },
    ],
  },
];

export default antallSomErMedRoutes;
