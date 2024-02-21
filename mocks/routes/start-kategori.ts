const startKategoriRoutes = [
  {
    id: "start-kategori-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/vert/start-kategori",
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
        id: "er-allerede-startet",
        type: "status",
        options: {
          status: 409,
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

export default startKategoriRoutes;
