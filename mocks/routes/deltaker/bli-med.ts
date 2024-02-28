const {
  dummyBliMed,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("../../dummydata");

const bliMedRoutes = [
  {
    id: "bli-med-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/bli-med",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: dummyBliMed,
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
        id: "ukjent-spørreundersøkelse",
        type: "status",
        options: {
          status: 403,
        },
      },
      {
        id: "spørreundersøkelse-i-feil-status",
        type: "status",
        options: {
          status: 403,
        },
      },
    ],
  },
];

export default bliMedRoutes;
