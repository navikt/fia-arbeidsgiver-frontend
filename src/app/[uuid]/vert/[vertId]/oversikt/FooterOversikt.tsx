"use client";

import React from "react";
import { Button, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import kartleggingStyles from "@/app/kartlegging.module.css";

import { useRouter } from "next/navigation";

export default function FooterOversikt() {
  const router = useRouter();

  return (
    <PageBlock as="footer" className={kartleggingStyles.footer}>
      <VStack gap={"4"}>
        <Button
          variant={"secondary"}
          onClick={() => router.push("ferdig")}
          className={kartleggingStyles.knappHvitBred}
        >
          Avslutt
        </Button>
      </VStack>
    </PageBlock>
  );
}
