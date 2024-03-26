import { Button, HStack } from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import spørsmålStyles from "./sporsmalsside.module.css";

import React from "react";
import { useRouter } from "next/navigation";
import { urlNesteVert, urlTilbake } from "@/utils/spørreundersøkelsesUtils";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";

export default function SpørsmålNavigasjon({
  spørsmålOgSvar,
  temaId,
}: {
  spørsmålOgSvar: SpørsmålsoversiktDto;
  temaId: number;
}) {
  const gåTilOversiktPåNeste =
    Number(spørsmålOgSvar.nesteSpørsmål?.temaId) !== Number(temaId);

  const håndterNesteknapp = () => {
    if (!spørsmålOgSvar) {
      throw new Error("Spørsmål mangler");
    }

    router.push(urlNesteVert(spørsmålOgSvar, gåTilOversiktPåNeste));
  };

  const håndterTilbakeknapp = () => {
    if (!spørsmålOgSvar) {
      throw new Error("Spørsmål mangler");
    }
    const url = urlTilbake(spørsmålOgSvar);
    if (url !== null) {
      router.push(url);
    } else {
      router.push(".");
    }
  };

  const router = useRouter();
  return (
    <HStack className={spørsmålStyles.footer} gap={"4"}>
      <Button
        variant="secondary"
        className={kartleggingStyles.knappHvitBred}
        onClick={håndterTilbakeknapp}
      >
        {spørsmålOgSvar.forrigeSpørsmål !== null
          ? "Forrige spørsmål"
          : "Tilbake til temaside"}
      </Button>
      <Button
        className={kartleggingStyles.knappBred}
        onClick={håndterNesteknapp}
      >
        {spørsmålOgSvar.nesteSpørsmål !== null && !gåTilOversiktPåNeste
          ? "Neste"
          : "Oversikt"}
      </Button>
    </HStack>
  );
}
