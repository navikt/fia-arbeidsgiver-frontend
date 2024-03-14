// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyVertSpørsmålListe } = require("@/utils/dummyData/vert");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_DELTAKER_UNDERSØKELSE_URL } = require("@/utils/urls");

import { spørsmålDTO } from "@/app/_types/sporreundersokelseDTO";
import { Request, Response } from "express";

const sporsmalOgSvarRoutes = [
  {
    id: "deltaker-sporsmal-og-svar",
    url: API_DELTAKER_UNDERSØKELSE_URL(),
    method: "POST",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req: Request, res: Response) => {
            const spmIndex = dummyVertSpørsmålListe.findIndex(
              (sporsmal: spørsmålDTO) => sporsmal.id === req.params.id,
            );
            if (spmIndex !== -1) {
              res.status(200);
              res.send({
                ...dummyVertSpørsmålListe[spmIndex],
              });
            } else {
              res.status(404);
              res.send(`Spørsmål med id ${req.params.id} ble ikke funnet`);
            }
          },
        },
      },
    ],
  },
];

export default sporsmalOgSvarRoutes;
