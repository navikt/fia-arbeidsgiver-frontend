import { spørsmålOgSvarMiddleware } from "../../middleware/spørsmål-og-svar-middleware";

const sporsmalOgSvarRoutes = [
  {
    id: "sporsmal-og-svar-vert-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/vert/sporsmal-og-svar/:id",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: spørsmålOgSvarMiddleware(),
        },
      },
    ],
  },
];

export default sporsmalOgSvarRoutes;
