// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummySpørsmålIndeks } = require("@/utils/dummydata");

const gjeldendeSporsmalRoutes = [
  {
    id: "gjeldende-sporsmal-route",
    url: "/fia-arbeidsgiver/sporreundersokelse(/vert)?/gjeldende-sporsmal",
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

export default gjeldendeSporsmalRoutes;
