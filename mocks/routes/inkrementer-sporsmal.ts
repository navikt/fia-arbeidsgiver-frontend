// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyKartleggingStatusPåbegynt } = require("@/utils/dummydata");

const nesteSporsmalRoutes = [
  {
    id: "inkrementer-sporsmal-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/vert/inkrementer-sporsmal",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: dummyKartleggingStatusPåbegynt,
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
        id: "har-ikke-tilgang",
        type: "status",
        options: {
          status: 403,
        },
      },
      {
        id: "er-i-feil-status",
        type: "status",
        options: {
          status: 409,
        },
      },
      {
        id: "mangler-kategoristatus",
        type: "status",
        options: {
          status: 500,
        },
      },
    ],
  },
];

export default nesteSporsmalRoutes;
