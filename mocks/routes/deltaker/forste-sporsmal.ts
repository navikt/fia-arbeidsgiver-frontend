// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyDeltakerFørsteSpørsmål } = require("@/utils/dummyData/deltaker");

const listeOverTemaRoutes = [
  {
    id: "deltaker-forste-sporsmal",
    url: "/fia-arbeidsgiver/sporreundersokelse/deltaker/v2/:id",
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
