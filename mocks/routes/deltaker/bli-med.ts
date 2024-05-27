// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_DELTAKER_BLI_MED_URL } = require("@/utils/urls");

const dummyBliMed = {
  spørreundersøkelseId: "e2f863df-309e-4314-9c7e-c584237fd90a",
  sesjonsId: "790fba4d-1c9f-4c20-a019-d574d9542421",
};

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
