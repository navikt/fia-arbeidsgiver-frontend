"use client";

import { Heading, Loader, Page, VStack } from "@navikt/ds-react";
import startsideStyles from "./startside.module.css";
import Logininformasjon from "./Logininformasjon";
import Status from "./Status";
import React from "react";
import { Feilside } from "@/app/_components/Feilside";
import { useVertSpørreundersøkelse } from "@/app/_api_hooks/vert/useVertSpørreundersøkelse";

export default function StartsideBody({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const { isLoading, error } = useVertSpørreundersøkelse(
    spørreundersøkelseId,
    vertId,
  );

  if (isLoading) {
    return (
      <Page.Block gutters width="xl">
        <VStack gap={"4"} align={"center"}>
          <Heading size={"large"}>Laster spørreundersøkelse</Heading>
          <Loader size="3xlarge" title="Venter..." />
        </VStack>
      </Page.Block>
    );
  }

  if (error) {
    return <Feilside feiltekst={error.message}></Feilside>;
  }

  return (
    <Page.Block gutters width="xl" className={startsideStyles.sideinnhold}>
      <Logininformasjon />
      <Status spørreundersøkelseId={spørreundersøkelseId} vertId={vertId} />
    </Page.Block>
  );
}
