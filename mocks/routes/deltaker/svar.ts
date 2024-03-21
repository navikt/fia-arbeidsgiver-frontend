// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_DELTAKER_SVAR_URL } = require("@/utils/urls");

const svarRoutes = [
  {
    id: "deltaker-svar",
    url: API_DELTAKER_SVAR_URL(),
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
        id: "har-ikke-tilgang",
        type: "status",
        options: {
          status: 403,
        },
      },
    ],
  },
];

export default svarRoutes;
