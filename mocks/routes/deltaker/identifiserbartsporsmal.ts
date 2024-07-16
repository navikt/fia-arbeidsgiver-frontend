const {
  førsteLedigeSpørsmål,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@/utils/dummydata");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_DELTAKER_UNDERSØKELSE_URL } = require("@/utils/urls");

const identifiserbartsporsmalRoutes = [
  {
    id: "deltaker-identifiserbartsporsmal",
    url: API_DELTAKER_UNDERSØKELSE_URL(),
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: førsteLedigeSpørsmål,
        },
      },
      {
        id: "feil",
        type: "status",
        options: {
          status: 400,
        },
      },
      {
        id: "ugyldig",
        type: "status",
        options: {
          status: 403,
        },
      },
    ],
  },
];

export default identifiserbartsporsmalRoutes;
