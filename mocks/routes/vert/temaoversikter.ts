import { Request, Response } from "express";
import { TemaDto } from "@/app/_types/TemaDto";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { helSpørreundersøkelse } = require("@/utils/dummydata");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_TEMAOVERSIKTER_URL } = require("@/utils/urls");

const listeOverTemaRoutes = [
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
      helSpørreundersøkelse.map((tema: TemaDto) => ({
        ...tema,
        status: temastatuser[tema.id],
      })),
    );
  };
}

export default listeOverTemaRoutes;
