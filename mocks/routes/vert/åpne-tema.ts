// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_ÅPNE_TEMA_URL } = require("@/utils/urls");

const åpneTemaRoutes = [
  {
    id: "vert-åpne-tema",
    url: API_VERT_ÅPNE_TEMA_URL(),
    method: "POST",
    variants: [
      {
        id: "success",
        type: "status",
        options: {
          status: 200,
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

export default åpneTemaRoutes;
