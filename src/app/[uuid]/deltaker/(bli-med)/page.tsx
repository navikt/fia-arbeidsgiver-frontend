import type { Metadata } from "next";
import { BodyShort, Heading, Page, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import React from "react";
import BliMedKnapp from "./BliMedKnapp";
import startsideStyles from "./startside.module.css";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du delta på litt litt kartlegging da",
};

export default function Landingsside({ params }: { params: { uuid: string } }) {
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
            IA kartleggingsmøte
          </Heading>
          <BodyShort align="center" className={startsideStyles.sidetekst}>
            Klikk på &quot;Bli med!&quot; for å delta på kartleggingsmøtet.
          </BodyShort>
          <BliMedKnapp spørreundersøkelseId={params?.uuid} />
        </VStack>
      </PageBlock>
    </Page>
  );
}
