const {
  dummyKartleggingStatusPåbegynt,
  dummyKartleggingStatusOpprettet,
  dummyKartleggingStatusIkkePåbegynt,
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
    ],
  },
];

export default kategoristatusRoutes;
