"use client";

import startsideStyles from "./startside.module.css";
import Logininformasjon from "./Logininformasjon";
import Status from "./Status";
import React from "react";
import { PageBlock } from "@navikt/ds-react/Page";

export default function StartsideBody({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  return (
    <PageBlock gutters width="xl" className={startsideStyles.sideinnhold}>
      <Logininformasjon spørreundersøkelseId={spørreundersøkelseId} />
      <Status spørreundersøkelseId={spørreundersøkelseId} vertId={vertId} />
    </PageBlock>
  );
}
