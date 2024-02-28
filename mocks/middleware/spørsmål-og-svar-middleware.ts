import { Request, Response } from "express";
import { SpørsmålDTO } from "@/app/_types/SpørsmålDTO";
import { dummySpørreundersøkelse } from "../dummydata";

// const {
//   dummySpørreundersøkelse,
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
// } = require("../../dummydata");

export function spørsmålOgSvarMiddleware() {
  return (req: Request, res: Response) => {
    const spmIndex = dummySpørreundersøkelse.findIndex(
      (sporsmal: SpørsmålDTO) => sporsmal.spørsmålId === req.params.id,
    );
    if (spmIndex !== -1) {
      res.status(200);
      res.send(dummySpørreundersøkelse[spmIndex]);
    } else {
      res.status(500);
      res.send(`Spørsmål med id ${req.params.id} ble ikke funnet`);
    }
  };
}
