// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyStartDto } = require("@/utils/dummyData/deltaker");

const listeOverTemaRoutes = [
  {
    id: "deltaker-forste-sporsmal",
    url: "/fia-arbeidsgiver/sporreundersokelse/deltaker/:id",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: dummyStartDto,
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
