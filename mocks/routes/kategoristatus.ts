const {
  dummyKartleggingStatusPåbegynt,
  dummyKartleggingStatusOpprettet,
  dummyKartleggingStatusIkkePåbegynt,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@/utils/dummydata");

const kategoristatusRoutes = [
  {
    id: "kategoristatus-route",
    url: "/fia-arbeidsgiver/sporreundersokelse(/vert)?/kategoristatus",
    method: "POST",
    variants: [
      {
        id: "opprettet",
        type: "json",
        options: {
          status: 200,
          body: dummyKartleggingStatusOpprettet,
        },
      },
      {
        id: "ikke-påbegynt",
        type: "json",
        options: {
          status: 200,
          body: dummyKartleggingStatusIkkePåbegynt,
        },
      },
      {
        id: "påbegynt-0",
        type: "json",
        options: {
          status: 200,
          body: {
            ...dummyKartleggingStatusPåbegynt,
            spørsmålindeks: 0,
          },
        },
      },
      {
        id: "påbegynt-1",
        type: "json",
        options: {
          status: 200,
          body: {
            ...dummyKartleggingStatusPåbegynt,
            spørsmålindeks: 1,
          },
        },
      },
      {
        id: "påbegynt-2",
        type: "json",
        options: {
          status: 200,
          body: {
            ...dummyKartleggingStatusPåbegynt,
            spørsmålindeks: 2,
          },
        },
      },
      {
        id: "påbegynt-3",
        type: "json",
        options: {
          status: 200,
          body: {
            ...dummyKartleggingStatusPåbegynt,
            spørsmålindeks: 3,
          },
        },
      },
      {
        id: "påbegynt-4",
        type: "json",
        options: {
          status: 200,
          body: {
            ...dummyKartleggingStatusPåbegynt,
            spørsmålindeks: 4,
          },
        },
      },
      {
        id: "kan-fullføre",
        type: "json",
        options: {
          status: 200,
          body: {
            ...dummyKartleggingStatusPåbegynt,
            spørsmålindeks: 100,
          },
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
      {
        id: "avsluttet",
        type: "status",
        options: {
          status: 410,
        },
      },
      {
        id: "mangler-kategoristatus",
        type: "status",
        options: {
          status: 500,
        },
      },
    ],
  },
];

export default kategoristatusRoutes;
