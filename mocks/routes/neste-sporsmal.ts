// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummySpørsmålIndeks } = require("@/utils/dummydata");

const nesteSporsmalRoutes = [
  {
    id: "neste-sporsmal-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/vert/neste-sporsmal",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: dummySpørsmålIndeks,
        },
      },
    ],
  },
];

export default nesteSporsmalRoutes;
