// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummySpørreundersøkelse } = require("@/utils/dummydata");

const sporsmalOgSvarRoutes = [
  {
    id: "sporsmal-og-svar-route",
    url: "/fia-arbeidsgiver/sporreundersokelse(/vert)?/sporsmal-og-svar",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: dummySpørreundersøkelse,
        },
      },
      {
        id: "bad-request",
        type: "status",
        options: {
          status: 400,
        },
      },
    ],
  },
];

export default sporsmalOgSvarRoutes;
