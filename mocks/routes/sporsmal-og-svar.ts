// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummySpørreundersøkelse } = require("@/utils/dummydata");

const sporsmalOgSvarRoutes = [
  {
    id: "sporsmal-og-svar-route", // route id
    url: "/fia-arbeidsgiver/sporreundersokelse(/vert)?/sporsmal-og-svar", // url in express format
    method: "POST", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: dummySpørreundersøkelse, // body to send
        },
      },
    ],
  },
];

export default sporsmalOgSvarRoutes;
