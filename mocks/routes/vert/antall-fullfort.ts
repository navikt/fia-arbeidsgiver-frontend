import { API_VERT_ANTALL_FULLFORT_URL } from "../../../src/utils/urls";
import { MockRoute } from "../../types";

const antallFullfortRoutes: MockRoute[] = [
  {
    id: "vert-antall-fullfort",
    url: API_VERT_ANTALL_FULLFORT_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "text",
        options: {
          status: 200,
          body: "17",
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

export default antallFullfortRoutes;
