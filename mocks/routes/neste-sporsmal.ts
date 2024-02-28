/* eslint-disable @typescript-eslint/no-var-requires */
const { dummySpørreundersøkelse } = require("@/utils/dummydata");

import { spørsmålDTO } from "@/app/_types/sporreundersokelseDTO";
import { Request, Response } from "express";

const nesteSporsmalRoutes = [
  {
    id: "neste-sporsmal-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/neste-sporsmal",
    method: "POST",
    variants: [
      {
        id: "åpen",
        type: "middleware",
        options: {
          middleware: generateMiddleware(true),
        },
      },
      {
        id: "lukket",
        type: "middleware",
        options: {
          middleware: generateMiddleware(false),
        },
      },
    ],
  },
];

function generateMiddleware(erNesteÅpnetAvVert: boolean) {
  return (req: Request, res: Response) => {
    const idOfSpørsmål = req.body.nåværendeSpørsmålId;
    if (idOfSpørsmål === "START") {
      res.status(200);

      res.send({
        hvaErNesteSteg: "NYTT_SPØRSMÅL",
        erNesteÅpnetAvVert,
        nesteSpørsmålId: dummySpørreundersøkelse[0].id,
        forrigeSporsmalId: null,
      });
    } else if (
      idOfSpørsmål ===
      dummySpørreundersøkelse[dummySpørreundersøkelse.length - 1].id
    ) {
      res.status(200);

      res.send({
        hvaErNesteSteg: "FERDIG",
        erNesteÅpnetAvVert: false,
        nesteSpørsmålId: null,
        forrigeSporsmalId:
          dummySpørreundersøkelse[dummySpørreundersøkelse.length - 2].id,
      });
    } else {
      const indexOfSpørsmål = dummySpørreundersøkelse.findIndex(
        (spørsmål: spørsmålDTO) => spørsmål.id === idOfSpørsmål,
      );

      if (indexOfSpørsmål === -1) {
        res.status(400);
        res.send("Spørsmål ikke funnet");
      } else {
        res.status(200);

        res.send({
          hvaErNesteSteg: "NYTT_SPØRSMÅL",
          erNesteÅpnetAvVert,
          nesteSpørsmålId: dummySpørreundersøkelse[indexOfSpørsmål + 1].id,
          forrigeSporsmalId:
            indexOfSpørsmål === 0
              ? null
              : dummySpørreundersøkelse[indexOfSpørsmål - 1].id,
        });
      }
    }
  };
}

export default nesteSporsmalRoutes;
