import { Request, Response } from "express";
import { TemaoversiktDto } from "@/app/_types/temaoversiktDto";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyTemaoversikt } = require("@/utils/dummyData/vert");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_UNDERSØKELSE_URL } = require("@/utils/urls");

const listeOverTemaRoutes = [
  {
    id: "vert-temaoversikt",
    url: API_VERT_UNDERSØKELSE_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: generateTemaMiddleware({ 1: "ÅPNET", 2: "IKKE_ÅPNET" }),
        },
      },
      {
        id: "success-første-besvart",
        type: "middleware",
        options: {
          middleware: generateTemaMiddleware({
            1: "ALLE_SPØRSMÅL_ÅPNET",
            2: "ÅPNET",
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
      dummyTemaoversikt.map((tema: TemaoversiktDto) => ({
        ...tema,
        status: temastatuser[tema.temaId],
      })),
    );
  };
}

export default listeOverTemaRoutes;
