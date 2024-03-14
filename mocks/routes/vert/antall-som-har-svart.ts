// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_ANTALL_SVARTE_URL } = require("@/utils/urls");

const antallSomHarSvartRoutes = [
  {
    id: "vert-antall-som-har-svart",
    url: API_VERT_ANTALL_SVARTE_URL(),
    method: "POST",
    variants: [
      {
        id: "en-har-svart",
        type: "json",
        options: {
          status: 200,
          body: { antallSomHarSvart: 1 },
        },
      },
      {
        id: "tre-har-svart",
        type: "json",
        options: {
          status: 200,
          body: { antallSomHarSvart: 3 },
        },
      },
      {
        id: "fem-har-svart",
        type: "json",
        options: {
          status: 200,
          body: { antallSomHarSvart: 5 },
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

export default antallSomHarSvartRoutes;
