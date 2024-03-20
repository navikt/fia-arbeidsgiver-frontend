const {
  dummyFørsteSpørsmål,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@/utils/dummyData/dummyInnholdForSpørreundersøkelse");

const sporsmalOgSvarRoutes = [
  {
    id: "deltaker-sporsmal-og-svar",
    url: "/fia-arbeidsgiver/sporreundersokelse/deltaker/:a/:b/:id",
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
      // TODO: Skriv om middleware til å håndtere rett mocking av overgang
      // {
      //   id: "success",
      //   type: "middleware",
      //   options: {
      //     middleware: (req: Request, res: Response) => {
      //       const spmIndex = dummyVertSpørsmålListe.findIndex(
      //         (sporsmal: SpørsmålsoversiktDto) => sporsmal.s === req.params.id,
      //       );
      //       if (spmIndex !== -1) {
      //         res.status(200);
      //         res.send({
      //           ...dummyVertSpørsmålListe[spmIndex],
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
    ],
  },
];

export default sporsmalOgSvarRoutes;
