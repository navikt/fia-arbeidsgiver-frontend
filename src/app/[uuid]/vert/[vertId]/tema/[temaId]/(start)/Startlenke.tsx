"use client";
import { Button } from "@navikt/ds-react";
import Link from "next/link";
import React from "react";
import temasideStyles from "./temaside.module.css";
import { ArrowRightIcon } from "@navikt/aksel-icons";

export default function Startlenke({
  uuid,
  vertId,
  temaId,
}: {
  uuid: string;
  vertId: string;
  temaId: string;
}) {
  return (
    <Button
      as={Link}
      href={`/${uuid}/vert/${vertId}/tema/${temaId}/sporsmal`}
      className={temasideStyles.startknapp}
      iconPosition="right"
      icon={<ArrowRightIcon />}
    >
      Start
    </Button>
  );
}
