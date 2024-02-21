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
    ],
  },
];

export default startKategoriRoutes;
