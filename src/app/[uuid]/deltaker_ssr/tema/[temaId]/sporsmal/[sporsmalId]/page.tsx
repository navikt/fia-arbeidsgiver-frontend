import React from "react";
import type { Metadata } from "next";
import { Page } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";

import spørsmålStyles from "./sporsmalsside.module.css";
import SpørsmålBody from "./SporsmalBody";
import { asyncArbeidsgiverApiFetcherDeltaker } from "@/app/api/_arbeidsgiverApiFetcherDeltaker";

export const metadata: Metadata = {
  title: "Deltaker",
};

export default async function Spørsmålsside({
  params,
}: {
  params: { uuid: string; temaId: string; sporsmalId: string };
}) {
  //TODO: Feilhpndtering
  const deltakerSpørsmål = await asyncArbeidsgiverApiFetcherDeltaker(
    `${params.uuid}/tema/${params.temaId}/sporsmal/${params.sporsmalId}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch deltakerSpørsmål");
      }
      return res;
    })
    .then((res) => res.json()).catch((error) => {
      console.error(error);
      return {
        error
      };
    });

  if (deltakerSpørsmål.error) {
    return <div>Error: {deltakerSpørsmål.error.message}</div>;
  }

  return (
    <Page contentBlockPadding="none">
      <PageBlock
        gutters
        width="lg"
        className={spørsmålStyles.spørsmålssideblokk}
      >
        <SpørsmålBody
          temaId={params.temaId}
          spørreundersøkelseId={params.uuid}
          spørsmålId={params.sporsmalId}
          deltakerSpørsmål={deltakerSpørsmål}
        />
      </PageBlock>
    </Page>
  );
}
