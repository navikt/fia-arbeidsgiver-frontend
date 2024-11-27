const {
  partssamarbeid,
  helSpørreundersøkelse,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@/utils/dummydata");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_TEMAOVERSIKT_URL } = require("@/utils/urls");
import { Request, Response } from "express";

const listeOverTemaRoutes = [
  {
    id: "vert-temaoversikt-for-ett-tema",
    url: API_VERT_TEMAOVERSIKT_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: generateTemaMiddleware({ 16: "ÅPNET", 17: "IKKE_ÅPNET" }),
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
        id: "success-static",
        type: "json",
        options: {
          status: 200,
          body: partssamarbeid,
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
    const tema = helSpørreundersøkelse.find(
      ({ id }: { id: number }) => id === Number(req.params.temaId),
    );
    if (tema !== undefined) {
      res.status(200);
      res.send({ ...tema, status: temastatuser[tema.id] });
    } else {
      res.status(404);
      res.send(`Tema med angitt temaid ble ikke funnet`);
    }
  };
}

export default listeOverTemaRoutes;
