"use client";

import React from "react";

import Spørsmålsseksjon from "./Sporsmalsseksjon";
import { SpørsmålHeadingDeltaker } from "./SpørsmålHeadingDeltaker";
import { Alert, BodyShort, Heading, VStack } from "@navikt/ds-react";
import spørsmålStyles from "./sporsmalsside.module.css";
import { useSpørsmåloversikt } from "@/app/_api_hooks/deltaker/useSpørsmåloversikt";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { useRouter } from "next/navigation";
import { harGyldigSesjonsID } from "@/utils/harGyldigSesjonsID";
import { HourglassTopFilledIcon } from "@navikt/aksel-icons";

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
  } = useSpørsmåloversikt(spørreundersøkelseId, temaId, spørsmålId);

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
          <Alert
            variant={"error"}
            className={kartleggingStyles.alertWarning}
            role="alert"
            aria-live="polite"
          >
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
            Vennligst vent...
          </Heading>
          <HourglassTopFilledIcon
            className={spørsmålStyles.venterTimeglass}
            title="Venter"
            fontSize="9rem"
          />
          <BodyShort className={spørsmålStyles.venterundertittel}>
            Spørsmål blir snart tilgjengelig.
          </BodyShort>
        </VStack>
      </>
    );
  }

  return (
    spørsmålOgSvar && (
      <>
        <SpørsmålHeadingDeltaker spørsmåloversikt={spørsmålOgSvar} />
        <Spørsmålsseksjon
          spørreundersøkelseId={spørreundersøkelseId}
          temaId={temaId}
          spørsmålId={spørsmålId}
          spørsmåloversikt={spørsmålOgSvar}
        />
      </>
    )
  );
}
