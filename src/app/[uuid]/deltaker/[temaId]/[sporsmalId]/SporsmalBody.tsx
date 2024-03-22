"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Spørsmålsseksjon from "./Sporsmalsseksjon";
import CookieHandler from "@/utils/CookieHandler";
import { SpørsmålBleedDeltaker } from "@/app/[uuid]/deltaker/[temaId]/[sporsmalId]/SpørsmålBleedDeltaker";
import { Tema } from "@/app/_types/tema";
import { Alert, Heading, Loader, VStack } from "@navikt/ds-react";
import spørsmålStyles from "@/app/[uuid]/deltaker/[temaId]/[sporsmalId]/sporsmalsside.module.css";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/deltaker/useSpørsmålOgSvar";
import { finskrivTema } from "@/utils/spørreundersøkelsesUtils";
import kartleggingStyles from "@/app/kartlegging.module.css";

export default function SpørsmålBody({
  spørreundersøkelseId,
  spørsmålId,
  tema,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
  tema: Tema;
}) {
  const router = useRouter();

  const storedSessionID = CookieHandler.sesjonsID;

  React.useEffect(() => {
    if (!storedSessionID) {
      router.push("../../deltaker");
    }
  });

  const {
    data: spørsmålOgSvar,
    isLoading: lasterSpørsmålOgSvar,
    error: feilSpørsmålOgSvar,
  } = useSpørsmålOgSvar(spørreundersøkelseId, tema, spørsmålId);

  if (lasterSpørsmålOgSvar) {
    return (
      <>
        <SpørsmålBleedDeltaker overskrift={finskrivTema(tema)} />
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
  if (feilSpørsmålOgSvar) {
    return (
      <>
        <SpørsmålBleedDeltaker overskrift={finskrivTema(tema)} />
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
        <SpørsmålBleedDeltaker overskrift={finskrivTema(tema)} />
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

  return (
    spørsmålOgSvar && (
      <>
        <SpørsmålBleedDeltaker overskrift={finskrivTema(tema)} />
        <Spørsmålsseksjon
          spørreundersøkelseId={spørreundersøkelseId}
          tema={tema}
          spørsmålId={spørsmålId}
          spørsmålOgSvar={spørsmålOgSvar}
        />
      </>
    )
  );
}
