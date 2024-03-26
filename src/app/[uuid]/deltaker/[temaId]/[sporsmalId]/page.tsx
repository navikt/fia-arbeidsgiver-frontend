import React from "react";
import type { Metadata } from "next";
import SpørsmålBody from "./SporsmalBody";
import { Page } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";

import spørsmålStyles from "./sporsmalsside.module.css";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Spørsmålsside({
  params,
}: {
  params: { uuid: string; temaId: number; sporsmalId: string };
}) {
  return (
    <Page contentBlockPadding="none">
      <PageBlock
        gutters
        width="lg"
        className={spørsmålStyles.spørsmålssideblokk}
      >
        <SpørsmålBody
          temaId={params.temaId}
          spørreundersøkelseId={params.uuid}
          spørsmålId={params.sporsmalId}
        />
      </PageBlock>
    </Page>
  );
}
