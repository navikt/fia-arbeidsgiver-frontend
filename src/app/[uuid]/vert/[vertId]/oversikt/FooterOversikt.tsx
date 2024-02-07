"use client";

import React from "react";
import { Button, Page, VStack } from "@navikt/ds-react";
import vertStyles from "../vert.module.css";
import { useRouter } from "next/navigation";

export default function FooterOversikt() {
  const router = useRouter();

  return (
    <Page.Block as="footer" className={vertStyles.footer}>
      <VStack gap={"4"}>
        <Button
          variant={"secondary"}
          onClick={() => router.push("ferdig")}
          className={vertStyles.knappHvitBred}
        >
          Avslutt
        </Button>
      </VStack>
    </Page.Block>
  );
}