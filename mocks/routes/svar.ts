const svarRoutes = [
  {
    id: "svar-route", // route id
    url: "/fia-arbeidsgiver/sporreundersokelse/svar", // url in express format
    method: "POST", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: {}, // body to send
        },
      },
    ],
  },
];

export default svarRoutes;
