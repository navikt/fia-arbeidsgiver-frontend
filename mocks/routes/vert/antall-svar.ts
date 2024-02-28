const {
  dummyAntallSvar,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("../../dummydata");

const antallSvarRoutes = [
  {
    id: "antall-svar-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/vert/antall-svar",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: dummyAntallSvar,
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

export default antallSvarRoutes;
