const {
  dummyFørsteSpørsmål,
  dummyFjerdeSpørsmål,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@/utils/dummyData/dummyInnholdForSpørreundersøkelse");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_DELTAKER_SPØRSMÅL_URL } = require("@/utils/urls");

const sporsmalOgSvarRoutes = [
  {
    id: "deltaker-sporsmal-og-svar",
    url: API_DELTAKER_SPØRSMÅL_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
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
      // TODO: Skriv om middleware til å håndtere rett mocking av overgang
      // {
      //   id: "success",
      //   type: "middleware",
      //   options: {
      //     middleware: (req: Request, res: Response) => {
      //       const spmIndex = dummySpørsmålOgSvarListeFørsteTema.findIndex(
      //         (sporsmal: SpørsmålsoversiktDto) => sporsmal === req.params.sporsmalId,
      //       );
      //       if (spmIndex !== -1) {
      //         res.status(200);
      //         res.send({
      //           ...dummySpørsmålOgSvarListeFørsteTema[spmIndex],
      //         });
      //       } else {
      //         res.status(404);
      //         res.send(`Spørsmål med id ${req.params.id} ble ikke funnet`);
      //       }
      //     },
      //   },
      // },
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
