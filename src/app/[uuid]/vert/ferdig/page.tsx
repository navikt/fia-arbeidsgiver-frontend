import type { Metadata } from "next";
import { Page } from "@navikt/ds-react";
import React from "react";
import HeaderVert from "@/app/_components/HeaderVert";
import FerdigInnhold from "./FerdigInnhold";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Ferdigside() {
  return (
    <Page contentBlockPadding="none">
      <HeaderVert />
      <FerdigInnhold />
    </Page>
  );
}
