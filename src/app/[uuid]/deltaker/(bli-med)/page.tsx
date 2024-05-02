import type { Metadata } from "next";
import { Alert, BodyShort, Heading, Page, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import React from "react";
import BliMedKnapp from "./BliMedKnapp";
import startsideStyles from "./startside.module.css";

export const metadata: Metadata = {
  title: "Bli med",
};

export default function Landingsside({
  params,
  searchParams,
}: {
  params: { uuid: string };
  searchParams: { sesjon?: string };
}) {
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
            Velkommen!
          </Heading>
          <SesjonUtløptVarsel sesjon={searchParams.sesjon} />
          <BodyShort align="center" className={startsideStyles.sidetekst}>
            Trykk på knappen for å bli med
          </BodyShort>
          <BliMedKnapp spørreundersøkelseId={params?.uuid} />
        </VStack>
      </PageBlock>
    </Page>
  );
}

function SesjonUtløptVarsel({ sesjon }: { sesjon?: string }) {
  if (sesjon !== "utløpt") {
    return null;
  }

  return (
    <Alert variant={"error"}>
      Sesjonen din har utløpt. Vennligst start på nytt.
    </Alert>
  );
}
