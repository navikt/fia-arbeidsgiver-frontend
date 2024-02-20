// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummySpørreundersøkelse } = require("@/utils/dummydata");

import { spørsmålDTO } from "@/app/_types/sporreundersokelseDTO";
import { Request, Response } from "express";

const sporsmalOgSvarRoutes = [
  {
    id: "sporsmal-og-svar-route",
    url: "/fia-arbeidsgiver/sporreundersokelse(/vert)?/sporsmal-og-svar",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: dummySpørreundersøkelse,
        },
      },
      {
        id: "bad-request",
        type: "status",
        options: {
          status: 400,
        },
      },
    ],
  },
  {
    id: "sporsmal-og-svar-id-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/sporsmal-og-svar/:id",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req: Request, res: Response) => {
            const spm = dummySpørreundersøkelse.find(
              (sporsmal: spørsmålDTO) => sporsmal.id === req.params.id,
            );
            if (spm) {
              res.status(200);
              res.send(spm);
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
