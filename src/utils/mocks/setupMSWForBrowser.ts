import {
  dummyBliMed,
  dummySpørreundersøkelse,
  dummyAntallDeltakere,
} from "@/utils/dummydata";
import { http } from "msw";

export default async function setupMSWForBrowser() {
  if (
    typeof window !== "undefined" &&
    (window?.location?.hostname?.includes("localhost") ||
      window?.location?.hostname?.includes("127.0.0.1"))
  ) {
    const { setupWorker } = await import("msw/browser");

    const handlers = [
      http.post(`/api/bli-med`, () => {
        return new Response(JSON.stringify(dummyBliMed));
      }),
      http.post(`/api/svar`, () => {
        return new Response(JSON.stringify({}));
      }),
      http.post(`/api/sporsmal-og-svar`, () => {
        return new Response(JSON.stringify(dummySpørreundersøkelse));
      }),
      http.post(`/api/vert/sporsmal-og-svar`, () => {
        return new Response(JSON.stringify(dummySpørreundersøkelse));
      }),
      http.post(`/api/vert/antall-deltakere`, () => {
        return new Response(JSON.stringify(dummyAntallDeltakere));
      }),
    ];
    const worker = setupWorker(...handlers);

    return worker.start();
  }

  return Promise.resolve();
}
