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
    ],
  },
];

export default sporsmalOgSvarRoutes;
