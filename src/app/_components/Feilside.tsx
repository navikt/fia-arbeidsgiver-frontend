import { Heading, Page } from "@navikt/ds-react";
import komponentStyles from "./komponenter.module.css";
import React from "react";

export function Feilside({ feiltekst }: { feiltekst: string }) {
  return (
    <Page.Block as={"main"}>
      <Heading size="large" level="1" className={komponentStyles.feilside}>
        {feiltekst}
      </Heading>
    </Page.Block>
  );
}
