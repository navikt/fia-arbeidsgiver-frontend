import express, { Request, Response } from "express";

import { MockRoute, Variant } from "./types";
import bliMedRoutes from "./routes/deltaker/bli-med";
import identifiserbartsporsmalRoutes from "./routes/deltaker/identifiserbartsporsmal";
import sporsmalOgSvarRoutes from "./routes/deltaker/sporsmal-og-svar";
import svarRoutes from "./routes/deltaker/svar";
import antallDeltakereRoutes from "./routes/vert/antall-deltakere";
import antallFullfortRoutes from "./routes/vert/antall-fullfort";
import antallSvarTemaRoutes from "./routes/vert/antall-svar-tema";
import antallSvarRoutes from "./routes/vert/antall-svar";
import avsluttTemaRoutes from "./routes/vert/avslutt-tema";
import kontekstRoutes from "./routes/vert/kontekst";
import temaoversiktRoutes from "./routes/vert/temaoversikt";
import temaoversikterRoutes from "./routes/vert/temaoversikter";
import temaresultatRoutes from "./routes/vert/temaresultat";
import virksomhetsnavnRoutes from "./routes/vert/virksomhetsnavn";
import åpneTemaRoutes from "./routes/vert/åpne-tema";

const routes: MockRoute[] = [
  ...bliMedRoutes,
  ...identifiserbartsporsmalRoutes,
  ...sporsmalOgSvarRoutes,
  ...svarRoutes,
  ...antallDeltakereRoutes,
  ...antallFullfortRoutes,
  ...antallSvarTemaRoutes,
  ...antallSvarRoutes,
  ...avsluttTemaRoutes,
  ...kontekstRoutes,
  ...temaoversiktRoutes,
  ...temaoversikterRoutes,
  ...temaresultatRoutes,
  ...virksomhetsnavnRoutes,
  ...åpneTemaRoutes,
];

const expressServer = express();
expressServer.use(express.json());
expressServer.use(express.urlencoded({ extended: true }));

function defaultVariantId(route: MockRoute): string {
  return (
    route.variants.find((v) => v.id === "success")?.id ?? route.variants[0].id
  );
}

const activeVariantIds = new Map<string, string>(
  routes.map((route) => [route.id, defaultVariantId(route)]),
);

function handleVariant(variant: Variant, req: Request, res: Response) {
  switch (variant.type) {
    case "json":
      res.status(variant.options.status ?? 200).json(variant.options.body);
      break;
    case "status":
      res.sendStatus(variant.options.status ?? 200);
      break;
    case "text":
      res
        .status(variant.options.status ?? 200)
        .type("text")
        .send(variant.options.body);
      break;
    case "middleware":
      variant.options.middleware?.(req, res);
      break;
  }
}

for (const route of routes) {
  const handler = (req: Request, res: Response) => {
    const activeVariantId = activeVariantIds.get(route.id);
    const variant =
      route.variants.find((v) => v.id === activeVariantId) ?? route.variants[0];
    handleVariant(variant, req, res);
  };

  if (route.method === "GET") {
    expressServer.get(route.url, handler);
  } else if (route.method === "POST") {
    expressServer.post(route.url, handler);
  } else {
    throw new Error(`Ukjent metode "${route.method}" for rute ${route.id}`);
  }
}

// Admin-API for å velge hvilken variant som skal returneres for en gitt rute,
// f.eks: curl -X PUT http://localhost:3100/__mock/vert-kontekst/success-evaluering-uten-syk
expressServer.get("/__mock/routes", (_req, res) => {
  res.json(
    routes.map((route) => ({
      id: route.id,
      activeVariantId: activeVariantIds.get(route.id),
      variantIds: route.variants.map((v) => v.id),
    })),
  );
});

expressServer.put("/__mock/:routeId/:variantId", (req, res) => {
  const { routeId, variantId } = req.params;
  const route = routes.find((r) => r.id === routeId);
  if (route === undefined) {
    res.status(404).send(`Fant ingen rute med id "${routeId}"`);
    return;
  }
  if (route.variants.find((v) => v.id === variantId) === undefined) {
    res
      .status(404)
      .send(`Fant ingen variant med id "${variantId}" for rute "${routeId}"`);
    return;
  }
  activeVariantIds.set(routeId, variantId);
  res.sendStatus(200);
});

const PORT = 3100;
expressServer.listen(PORT, () => {
  console.log(`Mock-server kjører på http://localhost:${PORT}`);
});
