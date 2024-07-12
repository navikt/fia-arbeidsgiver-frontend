const {
  partssamarbeidResultat,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@/utils/dummydata");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_TEMARESULTAT_URL } = require("@/utils/urls");

const listeOverTemaResultatRoutes = [
  {
    id: "vert-temaresultat",
    url: API_VERT_TEMARESULTAT_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: partssamarbeidResultat,
        },
      },
      {
        id: "feil",
        type: "status",
        options: {
          status: 400,
        },
      },
      {
        id: "ugyldig",
        type: "status",
        options: {
          status: 403,
        },
      },
    ],
  },
];

export default listeOverTemaResultatRoutes;
