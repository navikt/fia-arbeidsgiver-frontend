"use client";

import React from "react";

import Spørsmålsseksjon from "./Sporsmalsseksjon";
import { SpørsmålHeadingDeltaker } from "./SpørsmålHeadingDeltaker";
import { Alert, VStack } from "@navikt/ds-react";
import spørsmålStyles from "./sporsmalsside.module.css";
import { useDeltakerSpørsmål } from "@/app/_api_hooks/deltaker/useDeltakerSpørsmål";
import kartleggingStyles from "@/app/kartlegging.module.css";
import { useRouter } from "next/navigation";
import { harGyldigSesjonsID } from "@/utils/harGyldigSesjonsID";
import useLocalStorage from "@/utils/useLocalStorage";
import Lastevisning from "./Lastevisning";

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
    deltakerSpørsmål && (
      <>
        <SpørsmålHeadingDeltaker deltakerSpørsmål={deltakerSpørsmål} />
        <Spørsmålsseksjon
          spørreundersøkelseId={spørreundersøkelseId}
          temaId={temaId}
          spørsmålId={spørsmålId}
          deltakerSpørsmål={deltakerSpørsmål}
        />
      </>
    )
  );
}