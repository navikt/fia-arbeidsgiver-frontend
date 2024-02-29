const startTemaRoutes = [
  {
    id: "start-tema-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/vert/start-tema",
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
        id: "mangler-temastatus",
        type: "status",
        options: {
          status: 500,
        },
      },
    ],
  },
];

export default startTemaRoutes;
