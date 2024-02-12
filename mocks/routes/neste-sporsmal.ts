// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummySpørsmålIndeks } = require("@/utils/dummydata");

const nesteSporsmalRoutes = [
  {
    id: "neste-sporsmal-route", // route id
    url: "/fia-arbeidsgiver/sporreundersokelse/vert/neste-sporsmal", // url in express format
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

export default nesteSporsmalRoutes;
