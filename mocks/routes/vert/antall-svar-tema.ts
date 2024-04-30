// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_ANTALL_SVAR_TEMA_URL } = require("@/utils/urls");

const antallSvarTemaRoutes = [
  {
    id: "vert-antall-svar-tema",
    url: API_VERT_ANTALL_SVAR_TEMA_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "text",
        options: {
          status: 200,
          body: "19",
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

export default antallSvarTemaRoutes;
