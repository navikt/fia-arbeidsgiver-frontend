import type { Metadata } from "next";
import { Heading, Page, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import React from "react";
import startsideStyles from "@/app/[uuid]/deltaker/(bli-med)/startside.module.css";
import { FerdigInnhold } from "@/app/[uuid]/deltaker/ferdig/ferdigInnhold";

export const metadata: Metadata = {
  title: "Fullført",
};

export default function Ferdigside() {
  return (
    <Page contentBlockPadding="none">
      <PageBlock gutters width="lg">
        <VStack gap={"4"}>
          <Heading
            level="1"
            size="medium"
            className={startsideStyles.kartleggingsmøtetittel}
            align="center"
          >
            Fullført!
          </Heading>
          <FerdigInnhold />
        </VStack>
      </PageBlock>
    </Page>
  );
}
