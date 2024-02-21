"use client";

import React from "react";
import { Button, Page, VStack } from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";

import { useRouter } from "next/navigation";

export default function FooterOversikt() {
  const router = useRouter();

  return (
    <Page.Block as="footer" className={kartleggingStyles.footer}>
      <VStack gap={"4"}>
        <Button
          variant={"secondary"}
          onClick={() => router.push("ferdig")}
          className={kartleggingStyles.knappHvitBred}
        >
          Avslutt
        </Button>
      </VStack>
    </Page.Block>
  );
}
