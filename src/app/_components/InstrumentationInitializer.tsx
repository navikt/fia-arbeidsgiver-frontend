"use client";

import { initInstrumentation } from "@/utils/faro";

initInstrumentation();

// Denne fila eksisterer bare for å kjøre initInstrumentation() fra faro.ts i nettleser.
export default function InstrumentationInitializer() {
  return <></>;
}
