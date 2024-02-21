"use client";

import React from "react";
import { useRouter } from "next/navigation";

import CookieHandler from "@/utils/CookieHandler";
import { Heading, Loader, VStack } from "@navikt/ds-react";
import { useNesteSpørsmål } from "@/app/_api_hooks/navigasjon/nesteSpørsmål";

export default function TilbakeBody({
  spørreundersøkelsesId,
  spørsmålId,
}: {
  spørreundersøkelsesId: string;
  spørsmålId: string;
}) {
  const router = useRouter();
  const cookieHandler = new CookieHandler(spørreundersøkelsesId);
  const storedSessionID = cookieHandler.sesjonsID;

  const nesteSpørsmål = useNesteSpørsmål(spørreundersøkelsesId, spørsmålId);

  React.useEffect(() => {
    if (!storedSessionID) {
      router.push("../..");
    }
  });
  React.useEffect(() => {
    if (nesteSpørsmål.data?.forrigeSporsmalId !== null) {
      router.push(`../${nesteSpørsmål.data?.forrigeSporsmalId}`);
    } else if (
      nesteSpørsmål.data?.nesteSporsmalId !== null &&
      spørsmålId !== undefined
    ) {
      router.push(`.`);
    }
  }, [nesteSpørsmål.data, router, spørsmålId]);

  return (
    <VStack gap={"4"} align={"center"}>
      <Heading size={"large"}>Laster</Heading>
      <Loader size="3xlarge" title="Venter..." />
    </VStack>
  );
}
