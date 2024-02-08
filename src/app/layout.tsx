import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@navikt/ds-css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arbeidsgiverkartlegging",
  description: "Her skal det komme arbeidsgiverkartlegging etterhvert",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
