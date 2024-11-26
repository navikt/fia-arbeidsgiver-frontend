import type { Metadata } from "next";
import { Page } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import React from "react";
import { FerdigInnhold } from "@/app/[uuid]/deltaker/ferdig/ferdigInnhold";
import ferdigsideStyles from "./ferdigside.module.css";

export const metadata: Metadata = {
  title: "Fullført",
};

export default function Ferdigside() {
  return (
    <Page contentBlockPadding="none">
      <PageBlock className={ferdigsideStyles.sideinnhold}>
        <FerdigInnhold />
      </PageBlock>
    </Page>
  );
}
