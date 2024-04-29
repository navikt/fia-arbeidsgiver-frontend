const åpneTemaRoutes = [
  {
    id: "vert-åpne-tema",
    url: `/fia-arbeidsgiver/sporreundersokelse/vert/:vertId/tema/:temaId/start`,
    method: "POST",
    variants: [
      {
        id: "success",
        type: "text",
        options: {
          status: 200,
          body: "",
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
        id: "ugyldig-id",
        type: "status",
        options: {
          status: 403,
        },
      },
    ],
  },
];

export default åpneTemaRoutes;
