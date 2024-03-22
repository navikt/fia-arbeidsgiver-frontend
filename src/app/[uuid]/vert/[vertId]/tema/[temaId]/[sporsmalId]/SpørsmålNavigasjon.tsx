import { Box, Button, HStack, Page } from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import spørsmålStyles from "./sporsmalsside.module.css";

import React from "react";
import { useRouter } from "next/navigation";
import { urlNeste, urlTilbake } from "@/utils/spørreundersøkelsesUtils";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";

export default function SpørsmålNavigasjon({
  spørsmålOgSvar,
}: {
  spørsmålOgSvar: SpørsmålsoversiktDto;
}) {
  const håndterNesteknapp = () => {
    if (!spørsmålOgSvar) {
      throw new Error("Spørsmål mangler");
    }

    router.push(urlNeste(spørsmålOgSvar));
  };

  const håndterTilbakeknapp = () => {
    if (!spørsmålOgSvar) {
      throw new Error("Spørsmål mangler");
    }
    const url = urlTilbake(spørsmålOgSvar);
    if (url !== null) {
      router.push(url);
    } else {
      router.push("../../oversikt");
    }
  };

  const router = useRouter();
  return (
    <Box as="footer" padding="24">
      <Page.Block width="2xl">
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
            {spørsmålOgSvar.nesteSpørsmål !== null ? "Neste" : "Fullført"}
          </Button>
        </HStack>
      </Page.Block>
    </Box>
  );
}
