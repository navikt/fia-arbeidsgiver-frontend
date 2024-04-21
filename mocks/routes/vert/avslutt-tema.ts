// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_AVSLUTT_TEMA_URL } = require("@/utils/urls");

const bliMedRoutes = [
  {
    id: "vert-avslutt-tema",
    url: API_VERT_AVSLUTT_TEMA_URL(),
    method: "POST",
    variants: [
      {
        id: "success",
        type: "status",
        options: {
          status: 200,
        },
      },
    ],
  },
];

export default bliMedRoutes;
