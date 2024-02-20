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
      {
        id: "feil-formatert-uuid",
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
