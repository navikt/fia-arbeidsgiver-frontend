import type { Metadata } from "next";
import {
  Alert,
  BodyShort,
  Heading,
  Link,
  Page,
  Spacer,
  VStack,
} from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import React from "react";
import BliMedKnapp from "./BliMedKnapp";
import startsideStyles from "./startside.module.css";

export const metadata: Metadata = {
  title: "Bli med",
};

export default async function Landingsside(props: {
  params: Promise<{ uuid: string }>;
  searchParams: Promise<{ sesjon?: string }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  return (
    <Page contentBlockPadding="none" className={startsideStyles.startside}>
      <PageBlock
        gutters
        width="lg"
        className={startsideStyles.startsideinnhold}
      >
        <VStack gap={"4"} height={"100%"}>
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
          <Spacer />
          <Personvernseksjon />
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
    <Alert variant={"error"} role="alert" aria-live="polite">
      Sesjonen din har utløpt. Vennligst start på nytt.
    </Alert>
  );
}

function Personvernseksjon() {
  return (
    <div className={startsideStyles.personvernseksjon}>
      <BodyShort size="small" textColor="subtle" align="center">
        Nav bruker IP adressen din under spørreundersøkelsen, men den vil ikke
        bli lagret. Les mer i vår{" "}
        <Link
          href="https://www.nav.no/personvernerklaering"
          target="_blank"
          rel="noopener noreferrer"
          variant="subtle"
        >
          personvernerklæring
        </Link>
        .
      </BodyShort>
    </div>
  );
}
