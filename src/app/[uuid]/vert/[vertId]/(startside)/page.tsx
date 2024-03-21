import type { Metadata } from "next";
import React from "react";
import StartsideBody from "@/app/[uuid]/vert/[vertId]/(startside)/StartsideBody";
import { Page } from "@navikt/ds-react";
import startsideStyles from "./startside.module.css";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Startside({
  params,
}: {
  params: { uuid: string; vertId: string };
}) {
  return (
    <Page className={startsideStyles.startside}>
      <StartsideBody
        spørreundersøkelseId={params.uuid}
        vertId={params.vertId}
      />
    </Page>
  );
}
