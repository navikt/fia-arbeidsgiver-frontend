import { Request, Response } from "express";
import {
  partssamarbeidResultat,
  sykefraværsarbeidResultat,
  arbeidsmiljøResultat,
} from "../../../src/utils/dummydata";
import { API_VERT_TEMARESULTAT_URL } from "../../../src/utils/urls";
import { MockRoute } from "../../types";

const listeOverTemaResultatRoutes: MockRoute[] = [
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
