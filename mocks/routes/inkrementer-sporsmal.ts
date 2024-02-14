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
    ],
  },
];

export default nesteSporsmalRoutes;
