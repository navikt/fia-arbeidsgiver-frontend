"use client";

import React from "react";
import {
  Page,
  Loader,
  Button,
  VStack,
  BodyShort,
  HStack,
} from "@navikt/ds-react";
import { useSpørreundersøkelseInfo } from "@/app/_api_hooks/vert/useSpørreundersøkelseInfo";
import { useRouter } from "next/navigation";
import startsideStyles from "./startside.module.css";
import { PageBlock } from "@navikt/ds-react/Page";
import Mobilpåminnelse from "./Mobilpåminnelse";
import { VelkommenVirksomhet } from "./VelkommenVirksomhet";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import StartsideBoksElement from "./StartsideBoksElement";

export default function StartsideInnhold({
  params,
}: {
  params: { uuid: string };
}) {
  const router = useRouter();
  const spørreundersøkelseInfo = useSpørreundersøkelseInfo(params.uuid);

  const knappetekst = spørreundersøkelseInfo.data?.type
    ? `Start ${spørreundersøkelseInfo.data?.type?.toLowerCase()}en`
    : "Start";

  if (spørreundersøkelseInfo.isLoading || !spørreundersøkelseInfo.data) {
    return (
      <Page background="bg-subtle">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader variant="inverted" />
        </div>
      </Page>
    );
  }

  return (
    <Page background="bg-subtle" className={startsideStyles.startside}>
      <PageBlock
        gutters
        width="xl"
        className={startsideStyles.startsidePageBlock}
      >
        <Mobilpåminnelse />
        <div className={startsideStyles.startsideToppInnhold}>
          <VelkommenVirksomhet spørreundersøkelseId={params.uuid} />
          <Button
            onClick={() => router.push(`./vert/introside`)}
            icon={<ArrowRightIcon aria-hidden />}
            iconPosition="right"
            className={startsideStyles.startKnapp}
          >
            {knappetekst}
          </Button>
        </div>
        <VStack>
          <BodyShort
            align="center"
            spacing
            className={startsideStyles.boksBeskrivelse}
          >
            Inkluderende arbeidsliv handler om å:
          </BodyShort>
          <HStack gap="4">
            <StartsideBoksElement>
              <b>samarbeide</b> for en mer inkluderende arbeidsplass
            </StartsideBoksElement>
            <StartsideBoksElement>
              jobbe <b>systematisk</b> med sykefraværsarbeid
            </StartsideBoksElement>
            <StartsideBoksElement>
              jobbe <b>forebyggende</b> med arbeidsmiljø
            </StartsideBoksElement>
          </HStack>
        </VStack>
        <div />
      </PageBlock>
    </Page>
  );
}
