import { Heading } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import komponentStyles from "./komponenter.module.css";
import React from "react";

export function Feilside({ feiltekst }: { feiltekst: string }) {
  return (
    <PageBlock as={"main"}>
      <Heading size="large" level="1" className={komponentStyles.feilside}>
        {feiltekst}
      </Heading>
    </PageBlock>
  );
}
