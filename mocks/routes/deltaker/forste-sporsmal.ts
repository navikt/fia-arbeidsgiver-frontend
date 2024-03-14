// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyDeltakerFørsteSpørsmål } = require("@/utils/dummyData/deltaker");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_DELTAKER_UNDERSØKELSE_URL } = require("@/utils/urls");

const listeOverTemaRoutes = [
  {
    id: "deltaker-forste-sporsmal",
    url: API_DELTAKER_UNDERSØKELSE_URL(),
    method: "POST",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: dummyDeltakerFørsteSpørsmål,
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
