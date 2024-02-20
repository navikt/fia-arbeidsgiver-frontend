// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyBliMed } = require("@/utils/dummydata");

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
        id: "feil-formatert-uuid",
        type: "status",
        options: {
          status: 400,
        },
      },
      {
        id: "feil-id",
        type: "status",
        options: {
          status: 403,
        },
      },
    ],
  },
];

export default bliMedRoutes;
