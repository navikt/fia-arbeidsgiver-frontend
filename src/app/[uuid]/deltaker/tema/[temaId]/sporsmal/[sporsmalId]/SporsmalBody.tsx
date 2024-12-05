"use client";

import React from "react";

import Spørsmålsseksjon, { SpørsmålsseksjonSkeleton } from "./Sporsmalsseksjon";
import { SpørsmålHeadingDeltaker } from "./SpørsmålHeadingDeltaker";
import { Alert, Heading, Skeleton, VStack } from "@navikt/ds-react";
import spørsmålStyles from "./sporsmalsside.module.css";
import { useDeltakerSpørsmål } from "@/app/_api_hooks/deltaker/useDeltakerSpørsmål";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { useRouter } from "next/navigation";
import { harGyldigSesjonsID } from "@/utils/harGyldigSesjonsID";
import useLocalStorage from "@/utils/useLocalStorage";
import Lastevisning from "./Lastevisning";
import { Framdrift } from "./Framdrift";
import { DeltakerSpørsmålDto } from "@/app/_types/DeltakerSpørsmålDto";

export default function SpørsmålBody({
  spørreundersøkelseId,
  spørsmålId,
  temaId,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
  temaId: number;
}) {
  const { storedValue: sisteTema, setValue: setSisteTema } = useLocalStorage<string>("sisteTema", "FØRSTE_LOAD");
  const { storedValue: sisteSpørsmål, setValue: setSisteSpørsmål } = useLocalStorage<DeltakerSpørsmålDto | undefined>("sisteSpørsmål");
  const router = useRouter();
  const {
    data: deltakerSpørsmål,
    error: feilSpørsmål,
  } = useDeltakerSpørsmål(spørreundersøkelseId, temaId, spørsmålId);

  React.useEffect(() => {
    if (deltakerSpørsmål && sisteTema !== deltakerSpørsmål.temanavn) {
      setSisteTema(deltakerSpørsmål.temanavn);
    }

    if (deltakerSpørsmål !== undefined && deltakerSpørsmål.spørsmålnummer !== sisteSpørsmål?.spørsmålnummer) {
      setSisteSpørsmål(deltakerSpørsmål);
    }
  }, [deltakerSpørsmål, sisteTema, setSisteTema, sisteSpørsmål, setSisteSpørsmål]);

  React.useEffect(() => {
    const sjekkSesjonOgRedirectOmMangler = async () => {
      const harSesjon = await harGyldigSesjonsID(spørreundersøkelseId);
      if (!harSesjon) {
        router.push("../../deltaker?sesjon=utløpt");
      }
    };

    sjekkSesjonOgRedirectOmMangler();
    // Disabler linting fordi vi bare vil kjøre denne en gang, så vi må ha tomt array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (feilSpørsmål) {
    return (
      <>
        <VStack
          gap={"4"}
          align={"center"}
          justify={"center"}
          className={spørsmålStyles.nesteStack}
        >
          <Alert
            variant={
              feilSpørsmål.message === "Spørreundersøkelsen er avsluttet."
                ? "warning"
                : "error"
            }
            className={kartleggingStyles.alertWarning}
            role="alert"
            aria-live="polite"
          >
            {feilSpørsmål.message}
          </Alert>
        </VStack>
      </>
    );
  }

  if (deltakerSpørsmål === undefined) {
    if (sisteTema === "FØRSTE_LOAD") {
      // Litt hacky, men bør fjerne en unødvendig blinkende render første runde gjennom rendering.
      return null;
    }

    if (sisteSpørsmål && sisteSpørsmål.antallSpørsmål > sisteSpørsmål.spørsmålnummer) {
      return <LoadingSkeleton sisteTema={sisteTema} sisteSpørsmål={sisteSpørsmål} />;

    }
    return <Lastevisning sisteTema={sisteTema} />;
  }

  return (
    <>
      <SpørsmålHeadingDeltaker deltakerSpørsmål={deltakerSpørsmål} />
      <Spørsmålsseksjon
        spørreundersøkelseId={spørreundersøkelseId}
        temaId={temaId}
        spørsmålId={spørsmålId}
        deltakerSpørsmål={deltakerSpørsmål}
      />
    </>
  );
}

function LoadingSkeleton({ sisteTema, sisteSpørsmål }: { sisteTema?: string, sisteSpørsmål?: DeltakerSpørsmålDto }) {
  return (
    <>
      <VStack
        justify={"start"}
        gap={"2"}
        className={spørsmålStyles.spørsmålsheader}
      >
        {sisteTema ? <Heading size="medium">{sisteTema}</Heading> : <Heading size="medium" as={Skeleton}>Laster tema</Heading>}
        <Framdrift
          spørsmålnummer={sisteSpørsmål?.spørsmålnummer || 1}
          totaltAntallSpørsmål={sisteSpørsmål?.antallSpørsmål || 4}
          temanavn={sisteTema || "Laster tema"}
        />
      </VStack>
      <SpørsmålsseksjonSkeleton sisteTema={sisteTema} />
    </>
  )
}