const {
  dummySpørreundersøkelseStatus,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("../../dummydata");

const spørreundersøkelseStatusRoutes = [
  {
    id: "sporreundersokelse-status-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/vert/sporreundersokelse-status",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: dummySpørreundersøkelseStatus,
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
        id: "har-ikke-tilgang",
        type: "status",
        options: {
          status: 403,
        },
      },
      {
        id: "avsluttet",
        type: "status",
        options: {
          status: 410,
        },
      },
      {
        id: "mangler-kategoristatus",
        type: "status",
        options: {
          status: 500,
        },
      },
    ],
  },
];

export default spørreundersøkelseStatusRoutes;
