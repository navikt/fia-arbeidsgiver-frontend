"use client";

import { initInstrumentation } from "@/utils/faro";
import React from "react";

// Denne fila eksisterer bare for å kjøre initInstrumentation() fra faro.ts i nettleser.
export default function InstrumentationInitializer() {
  React.useEffect(() => {
    initInstrumentation();
  });
  return <></>;
}
