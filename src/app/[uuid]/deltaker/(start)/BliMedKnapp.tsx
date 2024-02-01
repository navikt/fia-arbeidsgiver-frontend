"use client";

import { Button } from "@navikt/ds-react";
import React from "react";
import { useRouter } from "next/navigation";
import { fetchBliMed } from "@/app/_api_hooks/bliMed";
import styles from "./startside.module.css";

export default function BliMedKnapp({
  undersøkelsesID,
}: {
  undersøkelsesID: string;
}) {
  const router = useRouter();

  return (
    <Button
      variant={"secondary"}
      onClick={() => {
        fetchBliMed(undersøkelsesID).then(() => {
          router.push("deltaker/sporsmal");
        });
      }}
      className={styles.bliMedKnapp}
    >
      Bli med!
    </Button>
  );
}
