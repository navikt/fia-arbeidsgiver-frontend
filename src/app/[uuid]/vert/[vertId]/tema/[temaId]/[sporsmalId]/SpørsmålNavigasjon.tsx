import { Box, Button, HStack, Page } from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import spørsmålStyles from "./sporsmalsside.module.css";

import React from "react";
import { useRouter } from "next/navigation";
import { IdentifiserbartSpørsmål } from "@/app/_types/identifiserbartSpørsmål";

export default function SpørsmålNavigasjon({
  nesteSpørsmål,
  forrigeSpørsmål,
}: {
  nesteSpørsmål: IdentifiserbartSpørsmål;
  forrigeSpørsmål: IdentifiserbartSpørsmål;
}) {
  const router = useRouter();
  return (
    <Box as="footer" padding="24">
      <Page.Block width="2xl">
        <HStack className={spørsmålStyles.footer} gap={"4"}>
          <Button
            variant="secondary"
            className={kartleggingStyles.knappHvitBred}
            onClick={() => {
              forrigeSpørsmål !== null
                ? router.push(
                    `../${forrigeSpørsmål.temaId}/${forrigeSpørsmål.spørsmålId}`,
                  )
                : router.push(`./`);
            }}
          >
            {forrigeSpørsmål !== null
              ? "Forrige spørsmål"
              : "Tilbake til temaside"}
          </Button>
          <Button
            className={kartleggingStyles.knappBred}
            onClick={() => {
              {
                nesteSpørsmål !== null
                  ? router.push(
                      `../${nesteSpørsmål.temaId}/${nesteSpørsmål.spørsmålId}`,
                    )
                  : router.push("../../oversikt");
              }
            }}
          >
            {nesteSpørsmål !== null ? "Neste" : "Fullført"}
          </Button>
        </HStack>
      </Page.Block>
    </Box>
  );
}
