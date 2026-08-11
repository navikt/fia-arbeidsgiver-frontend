import { Request, Response } from "express";
import { helSpørreundersøkelse } from "../../../src/utils/dummydata";
import { API_VERT_TEMAOVERSIKTER_URL } from "../../../src/utils/urls";
import { MockRoute } from "../../types";

const listeOverTemaRoutes: MockRoute[] = [
  {
    id: "vert-temaoversikt",
    url: API_VERT_TEMAOVERSIKTER_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: generateTemaMiddleware({
            16: "ÅPNET",
            17: "IKKE_ÅPNET",
            18: "IKKE_ÅPNET",
          }),
        },
      },
      {
        id: "success-første-besvart",
        type: "middleware",
        options: {
          middleware: generateTemaMiddleware({
            16: "STENGT",
            17: "ALLE_SPØRSMÅL_ÅPNET",
            18: "ÅPNET",
          }),
        },
      },
      {
        id: "success-alle-åpnet",
        type: "middleware",
        options: {
          middleware: generateTemaMiddleware({
            16: "ALLE_SPØRSMÅL_ÅPNET",
            17: "ALLE_SPØRSMÅL_ÅPNET",
            18: "ALLE_SPØRSMÅL_ÅPNET",
          }),
        },
      },
      {
        id: "success-alle-stengt",
        type: "middleware",
        options: {
          middleware: generateTemaMiddleware({
            16: "STENGT",
            17: "STENGT",
            18: "STENGT",
          }),
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

function generateTemaMiddleware(temastatuser: { [key: number]: string }) {
  return (req: Request, res: Response) => {
    res.status(200);
    res.send(
      helSpørreundersøkelse.map((tema) => ({
        ...tema,
        status: temastatuser[tema.id],
      })),
    );
  };
}

export default listeOverTemaRoutes;
