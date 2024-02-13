const svarRoutes = [
  {
    id: "svar-route",
    url: "/fia-arbeidsgiver/sporreundersokelse/svar",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: {},
        },
      },
    ],
  },
];

export default svarRoutes;
