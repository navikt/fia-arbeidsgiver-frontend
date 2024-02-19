const svarRoutes = [
  {
    id: "svar-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/svar",
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
        id: "feil-formatert-uuid",
        type: "status",
        options: {
          status: 400,
        },
      },
      {
        id: "feil-id",
        type: "status",
        options: {
          status: 403,
        },
      },
    ],
  },
];

export default svarRoutes;
