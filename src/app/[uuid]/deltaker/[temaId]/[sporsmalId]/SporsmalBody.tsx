"use client";

import React from "react";

import Spørsmålsseksjon from "./Sporsmalsseksjon";
import { SpørsmålHeadingDeltaker } from "./SpørsmålHeadingDeltaker";
import { Alert, Heading, Loader, VStack } from "@navikt/ds-react";
import spørsmålStyles from "./sporsmalsside.module.css";
import { useSpørsmålOgSvar } from "@/app/_api_hooks/deltaker/useSpørsmålOgSvar";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { useRouter } from "next/navigation";
import { harGyldigSesjonsID } from "@/utils/harGyldigSesjonsID";

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
      const harSesjon = await harGyldigSesjonsID(spørreundersøkelseId);
      if (!harSesjon) {
        router.push("../../deltaker?sesjon=utløpt");
      }
    };

    sjekkSesjonOgRedirectOmMangler();
  });

  if (feilSpørsmålOgSvar) {
    return (
      <>
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

  if (spørsmålOgSvar === undefined || lasterSpørsmålOgSvar) {
    return (
      <>
        <VStack gap={"4"} align={"center"}>
          <Heading
            level="1"
            size="medium"
            className={spørsmålStyles.ventertittel}
            align="center"
          >
            Venter...
          </Heading>
          <Loader variant={"interaction"} size="3xlarge" title="Venter" />
        </VStack>
      </>
    );
  }

  return (
    spørsmålOgSvar && (
      <>
        <SpørsmålHeadingDeltaker spørsmålOgSvar={spørsmålOgSvar} />
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
