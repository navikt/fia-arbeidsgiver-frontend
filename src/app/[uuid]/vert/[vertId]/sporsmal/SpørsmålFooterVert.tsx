import { Box, Page } from "@navikt/ds-react";
import SpørsmålNavigasjon from "@/app/[uuid]/vert/[vertId]/sporsmal/SpørsmålNavigasjon";
import React from "react";

export function SpørsmålFooterVert({
  aktivtSpørsmålindex,
  erViPåSisteSpørsmål,
  setAktivtSpørsmålindex,
}: {
  aktivtSpørsmålindex: number;
  erViPåSisteSpørsmål: boolean;
  setAktivtSpørsmålindex: (index: number) => void;
}) {
  return (
    <Box as="footer" padding="24">
      <Page.Block width="2xl">
        <SpørsmålNavigasjon
          erViPåSisteSpørsmål={erViPåSisteSpørsmål}
          aktivtSpørsmålindex={aktivtSpørsmålindex}
          setAktivtSpørsmålindex={setAktivtSpørsmålindex}
        />
      </Page.Block>
    </Box>
  );
}
