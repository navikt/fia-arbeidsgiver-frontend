import type { Metadata } from "next";
import Dellinje from "./Dellinje";
import { Page, VStack } from "@navikt/ds-react";
import React from "react";
import FooterOversikt from "@/app/[uuid]/vert/oversikt/FooterOversikt";
import HeaderVert from "@/app/_components/HeaderVert";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Oversiktside() {
  const deltakere = 6;
  return (
    <Page contentBlockPadding="none" footer={<FooterOversikt />}>
      <HeaderVert deltakere={deltakere} />
      <Page.Block as={"main"}>
        <VStack gap="4">
          <Dellinje
            delnavn="Partssamarbeid"
            delnummer={1}
            tid={10}
            punkter={10}
          />
          <Dellinje
            delnavn="Systematisk sykefravær"
            delnummer={2}
            tid={15}
            punkter={12}
          />
          <Dellinje
            delnavn="Tilrettelegging og medvirkning"
            delnummer={3}
            tid={5}
            punkter={4}
          />
        </VStack>
      </Page.Block>
    </Page>
  );
}
