// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_ANTALL_SVAR_URL } = require("@/utils/urls");

const antallSvarRoutes = [
  {
    id: "vert-antall-svar",
    url: API_VERT_ANTALL_SVAR_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "text",
        options: {
          status: 200,
          body: "18",
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
