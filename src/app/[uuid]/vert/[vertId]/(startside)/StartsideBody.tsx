"use client";

import { Page } from "@navikt/ds-react";
import startsideStyles from "./startside.module.css";
import Logininformasjon from "./Logininformasjon";
import Status from "./Status";
import React from "react";

export default function StartsideBody({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  return (
    <Page.Block gutters width="xl" className={startsideStyles.sideinnhold}>
      <Logininformasjon spørreundersøkelseId={spørreundersøkelseId} />
      <Status spørreundersøkelseId={spørreundersøkelseId} vertId={vertId} />
    </Page.Block>
  );
}
