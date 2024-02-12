// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummySpørsmålIndeks } = require("@/utils/dummydata");

const gjeldendeSporsmalRoutes = [
  {
    id: "gjeldende-sporsmal-route", // route id
    url: "/fia-arbeidsgiver/sporreundersokelse(/vert)?/gjeldende-sporsmal", // url in express format
    method: "POST", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: dummySpørsmålIndeks, // body to send
        },
      },
    ],
  },
];

export default gjeldendeSporsmalRoutes;
