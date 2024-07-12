import { Request, Response } from "express";
import { TemaDto } from "@/app/_types/TemaDto";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { helSpørreundersøkelse } = require("@/utils/dummydata");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_UNDERSØKELSE_URL } = require("@/utils/urls");

const listeOverTemaRoutes = [
  {
    id: "vert-temaoversikt",
    url: API_VERT_UNDERSØKELSE_URL(),
    method: "GET",
    variants: [
      {
        id: "success-første-åpnet",
        type: "middleware",
        options: {
          middleware: generateTemaMiddleware({
            4: "ÅPNET",
            5: "IKKE_ÅPNET",
            6: "IKKE_ÅPNET",
          }),
        },
      },
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: generateTemaMiddleware({
            4: "STENGT",
            5: "ALLE_SPØRSMÅL_ÅPNET",
            6: "ÅPNET",
          }),
        },
      },
      {
        id: "success-alle-åpnet",
        type: "middleware",
        options: {
          middleware: generateTemaMiddleware({
            4: "ALLE_SPØRSMÅL_ÅPNET",
            5: "ALLE_SPØRSMÅL_ÅPNET",
            6: "ALLE_SPØRSMÅL_ÅPNET",
          }),
        },
      },
      {
        id: "success-alle-stengt",
        type: "middleware",
        options: {
          middleware: generateTemaMiddleware({
            4: "STENGT",
            5: "STENGT",
            6: "STENGT",
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
      helSpørreundersøkelse.map((tema: TemaDto) => ({
        ...tema,
        status: temastatuser[tema.id],
      })),
    );
  };
}

export default listeOverTemaRoutes;
