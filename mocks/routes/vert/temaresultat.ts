const {
  partssamarbeidResultat,
  sykefraværsarbeidResultat,
  arbeidsmiljøResultat,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@/utils/dummydata");
import { Request, Response } from "express";

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
        type: "middleware",
        options: {
          middleware: temaresultatMiddleware,
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

function temaresultatMiddleware(req: Request, res: Response) {
  if (req.params.temaId === sykefraværsarbeidResultat.temaId.toString()) {
    res.status(200).json(sykefraværsarbeidResultat);
  } else if (req.params.temaId === arbeidsmiljøResultat.temaId.toString()) {
    res.status(200).json(arbeidsmiljøResultat);
  } else {
    res.status(200).json(partssamarbeidResultat);
  }
}
