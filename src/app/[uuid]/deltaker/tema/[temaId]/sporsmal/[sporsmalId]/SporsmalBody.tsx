"use client";

import React from "react";

import Spørsmålsseksjon, { SpørsmålsseksjonSkeleton } from "./Sporsmalsseksjon";
import { SpørsmålHeadingDeltaker } from "./SpørsmålHeadingDeltaker";
import { Alert, Box, Heading, Skeleton, VStack } from "@navikt/ds-react";
import spørsmålStyles from "./sporsmalsside.module.css";
import { useDeltakerSpørsmål } from "@/app/_api_hooks/deltaker/useDeltakerSpørsmål";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { useRouter } from "next/navigation";
import { harGyldigSesjonsID } from "@/utils/harGyldigSesjonsID";
import useLocalStorage from "@/utils/useLocalStorage";
import Lastevisning from "./Lastevisning";
import { Framdrift } from "./Framdrift";

export default function SpørsmålBody({
  spørreundersøkelseId,
  spørsmålId,
  temaId,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
  temaId: number;
}) {
  const { storedValue: sisteTema, setValue: setSisteTema } = useLocalStorage<string>("sisteTema");
  const router = useRouter();
  const {
    data: deltakerSpørsmål,
    isLoading: lasterSpørsmål,
    error: feilSpørsmål,
  } = useDeltakerSpørsmål(spørreundersøkelseId, temaId, spørsmålId);

  React.useEffect(() => {
    if (deltakerSpørsmål && sisteTema !== deltakerSpørsmål.temanavn) {
      setSisteTema(deltakerSpørsmål.temanavn);
    }
  }, [deltakerSpørsmål, sisteTema, setSisteTema]);

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

  if (lasterSpørsmål) {
    return <LoadingSkeleton sisteTema={sisteTema} />;
  }


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

  if (deltakerSpørsmål === undefined || lasterSpørsmål) {
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

function LoadingSkeleton({ sisteTema }: { sisteTema?: string }) {
  return (
    <>
      <VStack
        justify={"start"}
        gap={"2"}
        className={spørsmålStyles.spørsmålsheader}
      >
        {sisteTema ? <Heading size="medium">{sisteTema}</Heading> : <Heading size="medium" as={Skeleton}>Laster tema</Heading>}
        <Framdrift
          spørsmålnummer={1}
          totaltAntallSpørsmål={4}
          temanavn={sisteTema || "Laster tema"}
        />
      </VStack>
      <SpørsmålsseksjonSkeleton sisteTema={sisteTema} />
    </>
  )
}