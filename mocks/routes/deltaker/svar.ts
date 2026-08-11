import { API_DELTAKER_SVAR_URL } from "../../../src/utils/urls";
import { MockRoute } from "../../types";

const svarRoutes: MockRoute[] = [
  {
    id: "deltaker-svar",
    url: API_DELTAKER_SVAR_URL(),
    method: "POST",
    variants: [
      {
        id: "success",
        type: "status",
        options: {
          status: 200,
        },
      },
      {
        id: "stengt-tema",
        type: "status",
        options: {
          status: 303,
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

export default svarRoutes;
