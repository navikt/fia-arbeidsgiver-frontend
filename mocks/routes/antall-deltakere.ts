// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyAntallDeltakere } = require("@/utils/dummydata");

const antallDeltakereRoutes = [
  {
    id: "antall-deltakere-route", // route id
    url: "/fia-arbeidsgiver/sporreundersokelse/vert/antall-deltakere", // url in express format
    method: "POST", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: dummyAntallDeltakere, // body to send
        },
      },
    ],
  },
];

export default antallDeltakereRoutes;
