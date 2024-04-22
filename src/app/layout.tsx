import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@navikt/ds-css";
import React from "react";
import InstrumentationInitializer from "./_components/InstrumentationInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Kartleggingsverktøy",
    default: "Kartleggingsverktøy",
  },
  other: {
    ["google"]: "notranslate",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className="notranslate" translate="no">
      <InstrumentationInitializer />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
