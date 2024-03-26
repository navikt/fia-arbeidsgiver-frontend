const {
  dummyTemaoversiktUtviklePartssamarbeid,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@/utils/dummyData/vert");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_TEMAOVERSIKT_OVER_ETT_TEMA_URL } = require("@/utils/urls");

const listeOverTemaRoutes = [
  {
    id: "vert-temaoversikt-for-ett-tema",
    url: API_VERT_TEMAOVERSIKT_OVER_ETT_TEMA_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: dummyTemaoversiktUtviklePartssamarbeid,
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

export default listeOverTemaRoutes;
