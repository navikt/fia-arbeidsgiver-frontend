// const {
//   spørsmålOgSvarMiddleware,
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
// } = require("../../middleware/spørsmål-og-svar-middleware");

import { spørsmålOgSvarMiddleware } from "../../middleware/spørsmål-og-svar-middleware";

const sporsmalOgSvarRoutes = [
  {
    id: "sporsmal-og-svar-deltaker-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/sporsmal-og-svar/:id",
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
