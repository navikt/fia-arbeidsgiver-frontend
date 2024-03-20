"use client";

import React from "react";
import { Button, Heading, VStack } from "@navikt/ds-react";
import startsideStyles from "./startside.module.css";
import { useRouter } from "next/navigation";
import { StatusPåDeltaker } from "@/app/_components/StatusPåDeltaker/StatusPåDeltaker";

export default function Status({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const router = useRouter();

  return (
    <VStack
      className={startsideStyles.status}
      align={"center"}
      justify={"center"}
    >
      <StatusPåDeltaker
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
