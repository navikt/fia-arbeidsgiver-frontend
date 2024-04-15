"use client";

import React from "react";

import Spørsmålsseksjon from "./Sporsmalsseksjon";
import { SpørsmålBleedDeltaker } from "@/app/[uuid]/deltaker/[temaId]/[sporsmalId]/SpørsmålBleedDeltaker";
import { Alert, Heading, Loader, VStack } from "@navikt/ds-react";
import spørsmålStyles from "@/app/[uuid]/deltaker/[temaId]/[sporsmalId]/sporsmalsside.module.css";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/deltaker/useSpørsmålOgSvar";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { useRouter } from "next/navigation";
import { harSesjonsID } from "@/utils/harSesjonsID";

export default function SpørsmålBody({
  spørreundersøkelseId,
  spørsmålId,
  temaId,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
  temaId: number;
}) {
  const router = useRouter();
  const {
    data: spørsmålOgSvar,
    isLoading: lasterSpørsmålOgSvar,
    error: feilSpørsmålOgSvar,
  } = useSpørsmålOgSvar(spørreundersøkelseId, temaId, spørsmålId);

  React.useEffect(() => {
    const sjekkSesjonOgRedirectOmMangler = async () => {
      const harSesjon = await harSesjonsID();
      if (!harSesjon) {
        router.push("../../deltaker");
      }
    };

    sjekkSesjonOgRedirectOmMangler();
  });

  if (feilSpørsmålOgSvar) {
    return (
      <>
        <SpørsmålBleedDeltaker spørsmålOgSvar={spørsmålOgSvar} />
        <VStack
          gap={"4"}
          align={"center"}
          justify={"center"}
          className={spørsmålStyles.nesteStack}
        >
          <Alert variant={"error"} className={kartleggingStyles.alertWarning}>
            {feilSpørsmålOgSvar.message}
          </Alert>
        </VStack>
      </>
    );
  }

  if (spørsmålOgSvar === undefined) {
    return (
      <>
        <SpørsmålBleedDeltaker spørsmålOgSvar={spørsmålOgSvar} />
        <VStack
          gap={"4"}
          align={"center"}
          justify={"center"}
          className={spørsmålStyles.nesteStack}
        >
          <Heading size={"large"}>Venter på vert</Heading>
          <Loader size="3xlarge" title="Venter..." />
        </VStack>
      </>
    );
  }

  if (lasterSpørsmålOgSvar) {
    return (
      <>
        <SpørsmålBleedDeltaker spørsmålOgSvar={spørsmålOgSvar} />
        <VStack
          gap={"4"}
          align={"center"}
          justify={"center"}
          className={spørsmålStyles.nesteStack}
        >
          <Heading size={"large"}>Laster spørsmål</Heading>
          <Loader size="3xlarge" title="Venter..." />
        </VStack>
      </>
    );
  }

  return (
    spørsmålOgSvar && (
      <>
        <SpørsmålBleedDeltaker spørsmålOgSvar={spørsmålOgSvar} />
        <Spørsmålsseksjon
          spørreundersøkelseId={spørreundersøkelseId}
          temaId={temaId}
          spørsmålId={spørsmålId}
          spørsmålOgSvar={spørsmålOgSvar}
        />
      </>
    )
  );
}
