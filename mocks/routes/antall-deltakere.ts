// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyAntallDeltakere } = require("@/utils/dummydata");

const antallDeltakereRoutes = [
  {
    id: "antall-deltakere-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/vert/antall-deltakere",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: dummyAntallDeltakere,
        },
      },
    ],
  },
];

export default antallDeltakereRoutes;
