const {
  dummyKartleggingStatusPåbegynt,
  dummyKartleggingStatusOpprettet,
  dummyKartleggingStatusIkkePåbegynt,
  dummyKartleggingStatusKanFullføre,
  generatePåbegyntKartleggingStatus,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@/utils/dummydata");

const kategoristatusRoutes = [
  {
    id: "kategoristatus-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/kategoristatus",
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
        id: "påbegynt",
        type: "json",
        options: {
          status: 200,
          body: dummyKartleggingStatusPåbegynt,
        },
      },
      {
        id: "påbegynt-0",
        type: "json",
        options: {
          status: 200,
          body: {
            ...dummyKartleggingStatusPåbegynt,
            spørsmålIndex: 0,
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
            spørsmålIndex: 1,
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
            spørsmålIndex: 2,
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
            spørsmålIndex: 3,
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
            spørsmålIndex: 4,
          },
        },
      },
      {
        id: "kan-fullføre",
        type: "json",
        options: {
          status: 200,
          body: dummyKartleggingStatusKanFullføre,
        },
      },
    ],
  },
];

export default kategoristatusRoutes;
