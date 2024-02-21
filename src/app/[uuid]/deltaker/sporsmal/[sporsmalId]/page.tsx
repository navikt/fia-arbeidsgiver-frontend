import React from "react";
import type { Metadata } from "next";
import SpørsmålBody from "./SporsmalBody";
import { Page } from "@navikt/ds-react";

import spørsmålStyles from "./sporsmalsside.module.css";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Spørsmålsside({
  params,
}: {
  params: { uuid: string; sporsmalId: string };
}) {
  return (
    <Page contentBlockPadding="none">
      <Page.Block
        gutters
        width="lg"
        className={spørsmålStyles.spørsmålssideblokk}
      >
        <SpørsmålBody
          spørreundersøkelseId={params.uuid}
          spørsmålId={params.sporsmalId}
        />
      </Page.Block>
    </Page>
  );
}
