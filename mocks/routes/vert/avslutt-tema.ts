import { API_VERT_AVSLUTT_TEMA_URL } from "../../../src/utils/urls";

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
