export function clearRouteVariants() {
  return fetch("http://localhost:3110/api/mock/custom-route-variants", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function setRouteVariant(routeVariant: string | string[]): Promise<any> {
  if (Array.isArray(routeVariant)) {
    return Promise.all(
      routeVariant.map((variant) => {
        return setRouteVariant(variant);
      }),
    );
  }
  return fetch("http://localhost:3110/api/mock/custom-route-variants", {
    body: JSON.stringify({
      id: routeVariant,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
