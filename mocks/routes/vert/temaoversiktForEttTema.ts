const {
  dummyTemaoversiktUtviklePartssamarbeid,
  dummyTemaoversikt,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@/utils/dummyData/vert");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_TEMAOVERSIKT_OVER_ETT_TEMA_URL } = require("@/utils/urls");
import { Request, Response } from "express";

const listeOverTemaRoutes = [
  {
    id: "vert-temaoversikt-for-ett-tema",
    url: API_VERT_TEMAOVERSIKT_OVER_ETT_TEMA_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req: Request, res: Response) => {
            const tema = dummyTemaoversikt.find(
              ({ temaId }: { temaId: number }) =>
                temaId === Number(req.params.temaId),
            );
            if (tema !== undefined) {
              res.status(200);
              res.send(tema);
            } else {
              res.status(404);
              res.send(`Tema med temaid ${req.params.temaId} ble ikke funnet`);
            }
          },
        },
      },
      {
        id: "success-static",
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
