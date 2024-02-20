// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyAntallDeltakere } = require("@/utils/dummydata");

const antallDeltakereRoutes = [
  {
    id: "antall-deltakere-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/vert/antall-deltakere",
    method: "POST",
    variants: [
      {
        id: "har-deltakere",
        type: "json",
        options: {
          status: 200,
          body: dummyAntallDeltakere,
        },
      },
      {
        id: "feil-i-uuid",
        type: "status",
        options: {
          status: 400,
        },
      },
      {
        id: "ugyldig-id",
        type: "status",
        options: {
          status: 403,
        },
      },
    ],
  },
];

export default antallDeltakereRoutes;
