"use client";

import React from "react";
import { Button, Page } from "@navikt/ds-react";
import vertStyles from "../vert.module.css";
import { useRouter } from "next/navigation";

export default function FooterSporsmal() {
  const router = useRouter();

  return (
    <Page.Block as="footer" className={vertStyles.footer}>
      <Button
        variant={"secondary"}
        onClick={() => router.push("oversikt")}
        className={vertStyles.knappHvitBred}
      >
        Avslutt
      </Button>
    </Page.Block>
  );
}
