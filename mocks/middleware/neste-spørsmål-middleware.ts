import { Request, Response } from "express";
// import { dummySpørreundersøkelse } from "@/utils/dummydata";
import { SpørsmålDTO } from "@/app/_types/SpørsmålDTO";
import { dummySpørreundersøkelse } from "../dummydata";

export function nesteSpørsmålMiddleware(erNesteÅpnetAvVert: boolean) {
  return (req: Request, res: Response) => {
    const idOfSpørsmål = req.body.nåværrendeSpørsmålId;
    if (idOfSpørsmål === "START") {
      res.status(200);

      res.send({
        hvaErNesteSteg: "NYTT_SPØRSMÅL",
        erNesteÅpnetAvVert,
        nesteSpørsmålId: dummySpørreundersøkelse[0].spørsmålId,
        forrigeSporsmalId: null,
      });
    } else if (
      idOfSpørsmål ===
      dummySpørreundersøkelse[dummySpørreundersøkelse.length - 1].spørsmålId
    ) {
      res.status(200);

      res.send({
        hvaErNesteSteg: "FERDIG",
        erNesteÅpnetAvVert: false,
        nesteSpørsmålId: null,
        forrigeSporsmalId:
          dummySpørreundersøkelse[dummySpørreundersøkelse.length - 2]
            .spørsmålId,
      });
    } else {
      const indexOfSpørsmål = dummySpørreundersøkelse.findIndex(
        (spørsmål: SpørsmålDTO) => spørsmål.spørsmålId === idOfSpørsmål,
      );

      if (indexOfSpørsmål === -1) {
        res.status(400);
        res.send("Spørsmål ikke funnet");
      } else {
        res.status(200);

        res.send({
          hvaErNesteSteg: "NYTT_SPØRSMÅL",
          erNesteÅpnetAvVert,
          nesteSpørsmålId:
            dummySpørreundersøkelse[indexOfSpørsmål + 1].spørsmålId,
          forrigeSporsmalId:
            indexOfSpørsmål === 0
              ? null
              : dummySpørreundersøkelse[indexOfSpørsmål - 1].spørsmålId,
        });
      }
    }
  };
}
