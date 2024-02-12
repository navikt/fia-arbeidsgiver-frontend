// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyBliMed } = require("@/utils/dummydata");

const bliMedRoutes = [
  {
    id: "bli-med-route", // route id
    url: "/fia-arbeidsgiver/sporreundersokelse/bli-med", // url in express format
    method: "POST", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: dummyBliMed, // body to send
        },
      },
    ],
  },
];

export default bliMedRoutes;
