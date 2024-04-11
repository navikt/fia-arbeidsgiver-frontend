const {
  dummyFørsteSpørsmål,
  dummyFjerdeSpørsmål,
  dummySpørsmålSamling,
  dummyFlervalgSpørsmålMedMangeSvaralternativer,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@/utils/dummyData/dummyInnholdForSpørreundersøkelse");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_DELTAKER_SPØRSMÅL_URL } = require("@/utils/urls");
import { Request, Response } from "express";

const sporsmalOgSvarRoutes = [
  {
    id: "deltaker-sporsmal-og-svar",
    url: API_DELTAKER_SPØRSMÅL_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req: Request, res: Response) => {
            const spm = dummySpørsmålSamling[req.params.sporsmalId];
            if (spm !== undefined) {
              res.status(200);
              res.send(spm);
            } else {
              res.status(404);
              res.send(`Spørsmål med angitt id ble ikke funnet`);
            }
          },
        },
      },
      {
        id: "mange-svaralternativer",
        type: "json",
        options: {
          status: 200,
          body: dummyFlervalgSpørsmålMedMangeSvaralternativer,
        },
      },
      {
        id: "static-success",
        type: "json",
        options: {
          status: 200,
          body: dummyFørsteSpørsmål,
        },
      },
      {
        id: "tema-2-spm-1",
        type: "json",
        options: {
          status: 200,
          body: dummyFjerdeSpørsmål,
        },
      },
      {
        id: "ikke-åpnet",
        type: "status",
        options: {
          status: 202,
        },
      },
      {
        id: "feil-i-uuid",
        type: "status",
        options: {
          status: 400,
        },
      },
      {
        id: "har-ikke-tilgang",
        type: "status",
        options: {
          status: 403,
        },
      },
    ],
  },
];

export default sporsmalOgSvarRoutes;
