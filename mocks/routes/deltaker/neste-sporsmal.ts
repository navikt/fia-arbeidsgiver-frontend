// const {
//   nesteSpørsmålMiddleware,
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
// } = require("../../middleware/neste-spørsmål-middleware");

import { nesteSpørsmålMiddleware } from "../../middleware/neste-spørsmål-middleware";

const nesteSporsmalRoutes = [
  {
    id: "neste-sporsmal-deltaker-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/neste-sporsmal",
    method: "POST",
    variants: [
      {
        id: "åpen",
        type: "middleware",
        options: {
          middleware: nesteSpørsmålMiddleware(true),
        },
      },
      {
        id: "lukket",
        type: "middleware",
        options: {
          middleware: nesteSpørsmålMiddleware(false),
        },
      },
    ],
  },
];

export default nesteSporsmalRoutes;
