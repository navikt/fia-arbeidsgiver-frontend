"use client";

import React from "react";
import { Page, Loader } from "@navikt/ds-react";
import { useSpørreundersøkelseInfo } from "@/app/_api_hooks/vert/useSpørreundersøkelseInfo";
import { EvalueringIntroside } from "./EvalueringIntroside";
import { BehovsvurderingIntroside } from "./BehovsvurderingIntroside";

export default function StartsideInnhold({
  params,
}: {
  params: { uuid: string };
}) {
  const spørreundersøkelseInfo = useSpørreundersøkelseInfo(params.uuid);

  if (spørreundersøkelseInfo.isLoading) {
    return (
      <Page background="bg-subtle">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader variant="inverted" />
        </div>
      </Page>
    );
  }
  if (spørreundersøkelseInfo.data?.type === "Evaluering") {
    return <EvalueringIntroside params={params} />;
  }

  if (spørreundersøkelseInfo.data?.type === "Behovsvurdering") {
    return <BehovsvurderingIntroside params={params} />;
  }

  //Vis behovsvurdering som default, for å unngå bugs før release av evaluering.
  return <BehovsvurderingIntroside params={params} />;
}
