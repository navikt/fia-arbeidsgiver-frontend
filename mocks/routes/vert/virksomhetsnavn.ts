import { API_VERT_VIRKSOMHETSNAVN_URL } from "../../../src/utils/urls";
import { MockRoute } from "../../types";

const virksomhetsnavnRoutes: MockRoute[] = [
  {
    id: "vert-virksomhetsnavn",
    url: API_VERT_VIRKSOMHETSNAVN_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "text",
        options: {
          status: 200,
          body: "Fisk og flesk AS",
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
        id: "ugyldig-id",
        type: "status",
        options: {
          status: 403,
        },
      },
    ],
  },
];

export default virksomhetsnavnRoutes;
