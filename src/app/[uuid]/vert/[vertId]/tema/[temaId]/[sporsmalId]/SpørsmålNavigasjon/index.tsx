import { Button, HStack } from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import spørsmålStyles from "../sporsmalsside.module.css";

import React from "react";
import { useRouter } from "next/navigation";
import { urlNesteVert, urlTilbake } from "@/utils/spørreundersøkelsesUtils";
import { SpørsmåloversiktDTO } from "@/app/_types/SpørsmåloversiktDTO";
import LinkTilResultat from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/[sporsmalId]/SpørsmålNavigasjon/LinkTilResultat";

export default function SpørsmålNavigasjon({
  spørsmålOgSvar,
  temaId,
}: {
  spørsmålOgSvar: SpørsmåloversiktDTO;
  temaId: number;
}) {
  const erPåSisteSpørsmål =
    Number(spørsmålOgSvar.nesteSpørsmål?.temaId) !== Number(temaId);

  const håndterNesteknapp = () => {
    if (!spørsmålOgSvar) {
      throw new Error("Spørsmål mangler");
    }

    router.push(urlNesteVert(spørsmålOgSvar, erPåSisteSpørsmål));
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
        {spørsmålOgSvar.forrigeSpørsmål !== null &&
        spørsmålOgSvar.spørsmålnummer > 1
          ? "Forrige spørsmål"
          : "Tilbake til temaside"}
      </Button>
      <HStack gap={"4"}>
        <LinkTilResultat
          skalViseKnapp={erPåSisteSpørsmål}
          urlTilResultatside={`../../resultater/${temaId}`}
        />
        <Button
          className={kartleggingStyles.knappBred}
          onClick={håndterNesteknapp}
        >
          {spørsmålOgSvar.nesteSpørsmål !== null && !erPåSisteSpørsmål
            ? "Neste"
            : "Oversikt"}
        </Button>
      </HStack>
    </HStack>
  );
}
