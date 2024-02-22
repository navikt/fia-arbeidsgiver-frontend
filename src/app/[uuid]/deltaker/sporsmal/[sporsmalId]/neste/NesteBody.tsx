"use client";

import React from "react";
import { useRouter } from "next/navigation";

import CookieHandler from "@/utils/CookieHandler";
import { Button, Heading, Loader, VStack } from "@navikt/ds-react";
import styles from "../sporsmalsside.module.css";
import { useNesteSpørsmål } from "@/app/_api_hooks/navigasjon/nesteSpørsmål";
import { SWRResponse } from "swr";
import { nesteSpørsmålDTO } from "@/app/_types/nesteSpørsmålDTO";

export default function NesteBody({
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
    if (nesteSpørsmål.data?.hvaErNesteSteg === "FERDIG") {
      router.push(`../../ferdig`);
    } else if (
      nesteSpørsmål.data?.hvaErNesteSteg === "NYTT_SPØRSMÅL" &&
      nesteSpørsmål.data?.nesteSpørsmålId !== null &&
      nesteSpørsmål.data?.erNesteÅpnetAvVert
    ) {
      router.push(`../${nesteSpørsmål.data.nesteSpørsmålId}`);
    }
  }, [nesteSpørsmål.data, router]);

  return (
    <VStack
      gap={"12"}
      align={"center"}
      justify={"center"}
      className={styles.nesteStack}
    >
      <NesteHeading nesteSpørsmål={nesteSpørsmål} spørsmålId={spørsmålId} />
      <Loader size="3xlarge" title="Venter..." />
      {spørsmålId === "START" ? null : (
        <Button
          variant="secondary"
          className={styles.tilbakeknapp}
          onClick={() => {
            router.push(".");
          }}
        >
          Tilbake
        </Button>
      )}
    </VStack>
  );
}

function NesteHeading({
  nesteSpørsmål,
  spørsmålId,
}: {
  nesteSpørsmål: SWRResponse<nesteSpørsmålDTO>;
  spørsmålId: string;
}) {
  if (spørsmålId === "START") {
    return (
      <Heading align="center" size={"large"}>
        Venter på at verten skal starte kartlegging
      </Heading>
    );
  }
  if (!nesteSpørsmål.data?.erNesteÅpnetAvVert) {
    return (
      <Heading align="center" size={"large"}>
        Venter på at verten skal fortsette
      </Heading>
    );
  }

  return (
    <Heading align="center" size={"large"}>
      Laster
    </Heading>
  );
}
