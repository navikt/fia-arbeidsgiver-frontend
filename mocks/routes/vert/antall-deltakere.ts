// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_ANTALL_DELTAKERE_URL } = require("@/utils/urls");

const antallDeltakereRoutes = [
  {
    id: "vert-antall-deltakere",
    url: API_VERT_ANTALL_DELTAKERE_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "text",
        options: {
          status: 200,
          body: "20",
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
