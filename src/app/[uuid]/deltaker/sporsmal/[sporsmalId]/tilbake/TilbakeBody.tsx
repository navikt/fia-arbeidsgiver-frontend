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
  const cookieHandler = new CookieHandler(spørreundersøkelseId);
  const storedSessionID = cookieHandler.sesjonsID;

  const nesteSpørsmål = useNesteSpørsmål(spørreundersøkelseId, spørsmålId);

  React.useEffect(() => {
    if (!storedSessionID) {
      router.push("../..");
    }
  });
  React.useEffect(() => {
    if (nesteSpørsmål.data !== undefined && nesteSpørsmål.data !== null) {
      if (
        nesteSpørsmål.data?.forrigeSporsmalId !== null &&
        nesteSpørsmål.data?.forrigeSporsmalId !== undefined
      ) {
        router.push(`../${nesteSpørsmål.data?.forrigeSporsmalId}`);
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
