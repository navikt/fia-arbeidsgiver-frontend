// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyBliMed } = require("@/utils/dummydata/deltaker");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_DELTAKER_BLI_MED_URL } = require("@/utils/urls");

const bliMedRoutes = [
  {
    id: "deltaker-bli-med",
    url: API_DELTAKER_BLI_MED_URL,
    method: "POST",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: dummyBliMed,
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
        id: "ukjent-spørreundersøkelse",
        type: "status",
        options: {
          status: 403,
        },
      },
      {
        id: "spørreundersøkelse-i-feil-status",
        type: "status",
        options: {
          status: 403,
        },
      },
    ],
  },
];

export default bliMedRoutes;
