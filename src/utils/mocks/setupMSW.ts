import { dummyBliMed, dummySpørreundersøkelse } from "@/utils/dummydata";
import { http } from "msw";

export default async function setupMSW() {
  if (typeof window !== "undefined") {
    const { setupWorker } = await import("msw/browser");

    const handlers = [
      http.post(`/api/bli-med`, () => {
        return new Response(JSON.stringify(dummyBliMed));
      }),
      http.post(`/api/enkelt-svar`, () => {
        return new Response(JSON.stringify({}));
      }),
      http.post(`/api/sporreundersokelse`, () => {
        return new Response(JSON.stringify(dummySpørreundersøkelse));
      }),
    ];
    const worker = setupWorker(...handlers);

    return worker.start();
  }
}
