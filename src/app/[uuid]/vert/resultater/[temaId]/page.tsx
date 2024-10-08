import type { Metadata } from "next";
import React from "react";
import { ResultatRenderer } from "./ResultatRenderer";
import HeaderVert from "@/app/_components/HeaderVert";
import { Page } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import resultaterStyles from "../resultater.module.css";

export const metadata: Metadata = {
  title: "Temaresultat",
};

export default function Temaresultatside({
  params,
}: {
  params: { uuid: string; temaId: number };
}) {
  return (
    <>
      <HeaderVert spørreundersøkelseId={params.uuid} />
      <Page
        contentBlockPadding="none"
        background="bg-subtle"
        className={resultaterStyles.page}
      >
        <PageBlock gutters width="2xl" className={resultaterStyles.pageBlock}>
          <ResultatRenderer
            temaId={params.temaId}
            spørreundersøkelseId={params.uuid}
          />
        </PageBlock>
      </Page>
    </>
  );
}
