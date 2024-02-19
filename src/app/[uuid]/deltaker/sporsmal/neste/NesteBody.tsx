"use client";

import React from "react";
import { useRouter } from "next/navigation";

import CookieHandler from "@/utils/CookieHandler";
import { Button, Heading, Loader, VStack } from "@navikt/ds-react";
import styles from "../sporsmalsside.module.css";
import { finnSpørsmålSomMatcherIndex } from "../Sporsmalsseksjon";
import {
  useKategoristatus,
  useSpørreundersøkelse,
} from "@/app/_api_hooks/sporsmalOgSvar";

export default function NesteBody({
  spørreundersøkelsesId,
}: {
  spørreundersøkelsesId: string;
}) {
  const cookieHandler = new CookieHandler(spørreundersøkelsesId);
  const storedSessionID = cookieHandler.sesjonsID;
  React.useEffect(() => {
    if (!storedSessionID) {
      router.push("../deltaker");
    }
  });
  const { data: kategoristatus } = useKategoristatus(spørreundersøkelsesId);
  const { data: spørsmål } = useSpørreundersøkelse(spørreundersøkelsesId);
  const router = useRouter();
  const storedSisteSvarteID = cookieHandler.sisteSvarteSpørsmålId;

  React.useEffect(() => {
    const sisteSvarteIndex = finnSpørsmålSomMatcherIndex(
      spørsmål,
      storedSisteSvarteID,
    );

    if (
      spørsmål &&
      typeof kategoristatus?.spørsmålindeks === "number" &&
      sisteSvarteIndex < kategoristatus?.spørsmålindeks &&
      kategoristatus?.status !== "OPPRETTET" &&
      kategoristatus?.status !== "IKKE_PÅBEGYNT"
    ) {
      if (storedSisteSvarteID === spørsmål[spørsmål.length - 1].id) {
        router.push(`../ferdig`);
      } else {
        router.push(`../sporsmal`);
      }
    }
  }, [kategoristatus, spørsmål, storedSisteSvarteID, router]);

  if (
    kategoristatus?.status === "OPPRETTET" ||
    kategoristatus?.status === "IKKE_PÅBEGYNT"
  ) {
    return (
      <VStack gap={"4"} align={"center"}>
        <Heading size={"large"}>
          Venter på at verten skal starte kartlegging
        </Heading>
        <Loader size="3xlarge" title="Venter..." />
      </VStack>
    );
  }

  return (
    <VStack gap={"4"} align={"center"}>
      <Heading size={"large"}>Venter på at verten skal fortsette</Heading>
      <Loader size="3xlarge" title="Venter..." />
      <Button
        variant="secondary"
        className={styles.tilbakeknapp}
        onClick={() => {
          console.log("tilbake"); //TODO: Gå tilbake
        }}
      >
        Tilbake
      </Button>
    </VStack>
  );
}
