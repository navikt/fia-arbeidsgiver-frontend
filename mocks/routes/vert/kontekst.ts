// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_KONTEKST_URL } = require("@/utils/urls");

const kontekstRoutes = [
  {
    id: "vert-kontekst",
    url: API_VERT_KONTEKST_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: {
            type: "Behovsvurdering",
            viksomhetsnavn: "Fisk og flesk AS",
            samarbeidsnavn: null,
          },
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

export default kontekstRoutes;
