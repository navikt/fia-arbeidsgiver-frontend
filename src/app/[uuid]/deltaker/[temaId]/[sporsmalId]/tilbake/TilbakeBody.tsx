"use client";

import React from "react";
import { useRouter } from "next/navigation";

import CookieHandler from "@/utils/CookieHandler";
import { Heading, Loader, VStack } from "@navikt/ds-react";
import spørsmålStyles from "../sporsmalsside.module.css";
import { useNesteSpørsmål } from "@/app/_api_hooks/deltaker/navigasjon/nesteSpørsmål";

export default function TilbakeBody({
  spørreundersøkelseId,
  spørsmålId,
}: {
  spørreundersøkelseId: string;
  spørsmålId: string;
}) {
  const router = useRouter();
  const storedSessionID = CookieHandler.sesjonsID;

  const nesteSpørsmål = useNesteSpørsmål(spørreundersøkelseId, spørsmålId);

  React.useEffect(() => {
    if (!storedSessionID) {
      router.push("../..");
    }
  });
  React.useEffect(() => {
    if (nesteSpørsmål.data !== undefined && nesteSpørsmål.data !== null) {
      if (
        nesteSpørsmål.data?.forrigeSpørsmålId !== null &&
        nesteSpørsmål.data?.forrigeSpørsmålId !== undefined
      ) {
        router.push(`../${nesteSpørsmål.data?.forrigeSpørsmålId}`);
      } else if (
        nesteSpørsmål.data?.nesteSpørsmålId !== null &&
        spørsmålId !== undefined
      ) {
        router.push(`.`);
      }
    }
  }, [nesteSpørsmål.data, router, spørsmålId]);

  return (
    <VStack
      gap={"4"}
      align={"center"}
      justify={"center"}
      className={spørsmålStyles.nesteStack}
    >
      <Heading size={"large"}>Laster</Heading>
      <Loader size="3xlarge" title="Venter..." />
    </VStack>
  );
}
