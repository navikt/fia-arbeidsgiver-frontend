const {
  dummyFørsteSpørsmål,
  dummyFjerdeSpørsmål,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@/utils/dummyData/dummyInnholdForSpørreundersøkelse");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_VERT_SPØRSMÅL_URL } = require("@/utils/urls");

const sporsmalOgSvarRoutes = [
  {
    id: "vert-sporsmal-og-svar",
    url: API_VERT_SPØRSMÅL_URL(),
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
      //   TODO: ta i bruk middleware til å finne index for spørsmålid lagt inn, bør gå fint om dummyFørsteSpørsmål++ blir lagt i en liste
      // {
      //   id: "middle",
      //   type: "middleware",
      //   options: {
      //     middleware: (req: Request, res: Response) => {
      //       const spmIndex = dummyVertSpørsmålListe.findIndex(
      //         (sporsmal: spørsmålDTO) => sporsmal.id === req.params.sporsmalId,
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
