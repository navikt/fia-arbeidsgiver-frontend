import type { Metadata } from "next";
import { Page } from "@navikt/ds-react";
import React from "react";
import HeaderVert from "@/app/_components/HeaderVert";
import FerdigInnhold from "@/app/[uuid]/vert/ferdig/FerdigInnhold";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Ferdigside() {
  const deltakere = 6;
  const møtenr = 1;
  const virksomhetsnavn = "todo- hent navn";
  return (
    <Page contentBlockPadding="none">
      <HeaderVert
        deltakere={deltakere}
        møtenr={møtenr}
        virksomhetsnavn={virksomhetsnavn}
      />
      <FerdigInnhold />
    </Page>
  );
}
