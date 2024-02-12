const collections = [
  {
    id: "base",
    routes: ["add-headers:enabled", "get-users:success", "get-user:success"],
  },
  {
    id: "no-headers",
    from: "base",
    routes: ["add-headers:disabled"],
  },
  {
    id: "all-users",
    from: "base",
    routes: ["get-users:all", "get-user:id-3"],
  },
  {
    id: "user-real",
    from: "no-headers",
    routes: ["get-user:real"],
  },
];

export default collections;
