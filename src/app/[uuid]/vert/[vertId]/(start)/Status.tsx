"use client";

import React from "react";
import { Button, Heading, VStack } from "@navikt/ds-react";
import styles from "./startside.module.css";
import { useRouter } from "next/navigation";
import { Deltakelsesstatus } from "@/app/_components/Deltakelsesstatus";

export default function Status({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const router = useRouter();

  return (
    <VStack className={styles.status} align={"center"} justify={"center"}>
      <Deltakelsesstatus
        vertId={vertId}
        spørreundersøkelseId={spørreundersøkelseId}
      />
      <Heading level="2" size="medium" spacing>
        Venter på deltakere...
      </Heading>
      <Button
        variant={"secondary"}
        onClick={() =>
          router.push(`../../${spørreundersøkelseId}/vert/${vertId}/oversikt`)
        }
      >
        Kom i gang
      </Button>
    </VStack>
  );
}
