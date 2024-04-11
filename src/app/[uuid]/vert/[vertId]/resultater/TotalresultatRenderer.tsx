import { temaResultatDTO } from "@/app/_types/resultatDTO";
import HeaderVert from "@/app/_components/HeaderVert";
import { Heading, Page, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import HeaderBleed from "@/app/_components/HeaderBleed";
import { StatusPåDeltaker } from "@/app/_components/StatusPåDeltaker/StatusPåDeltaker";
import TemaGraf from "@/app/_components/Resultatgraf/TemaGraf";
import React from "react";

export function TotalresultatRenderer({
  spørreundersøkelseId,
  vertId,
  temaer,
}: {
  spørreundersøkelseId: string;
  vertId: string;
  temaer: temaResultatDTO[];
}) {
  return (
    <>
      <HeaderVert spørreundersøkelseId={spørreundersøkelseId} vertId={vertId} />
      <Page contentBlockPadding="none">
        <PageBlock gutters width="lg">
          <HeaderBleed>
            <VStack>
              <Heading size="medium">Temaresultatside</Heading>
            </VStack>
            <StatusPåDeltaker
              spørreundersøkelseId={spørreundersøkelseId}
              vertId={vertId}
            />
          </HeaderBleed>
          {temaer.map((tema) => (
            <TemaGraf key={tema.tema} tema={tema} />
          ))}
        </PageBlock>
      </Page>
    </>
  );
}
