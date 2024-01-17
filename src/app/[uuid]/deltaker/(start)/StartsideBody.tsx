"use client";

import { Button, HStack, TextField } from "@navikt/ds-react";
import React, { useState } from "react";
import styles from "./startside.module.css";
import { useRouter } from "next/navigation";

export default function StartsideBody() {
  const router = useRouter();
  const [inputVerdier, setInputVerdier] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
  });

  const håndterInputEndring = (inputId: string, value: string) => {
    setInputVerdier((prevInputValues) => ({
      ...prevInputValues,
      [inputId]: value,
    }));
  };

  const håndterPinkode = () => {
    const verdier = Object.values(inputVerdier).join("");
    console.log(`Pinkode skrevet : ${verdier}`);
  };
  return (
    <>
      <HStack wrap={false} justify={"center"} gap={"3"}>
        <TextField
          type={"text"}
          id={"input1"}
          className={styles.inputSiffer}
          value={inputVerdier.input1}
          maxLength={1}
          label={"pinkode siffer 1"}
          hideLabel
          onChange={(e) => håndterInputEndring("input1", e.target.value)}
        />
        <TextField
          id={"input2"}
          type="text"
          className={styles.inputSiffer}
          value={inputVerdier.input2}
          maxLength={1}
          label={"pinkode siffer 2"}
          hideLabel
          onChange={(e) => håndterInputEndring("input2", e.target.value)}
        />
        <TextField
          id={"input3"}
          type="text"
          className={styles.inputSiffer}
          value={inputVerdier.input3}
          maxLength={1}
          label={"pinkode siffer 3"}
          hideLabel
          onChange={(e) => håndterInputEndring("input3", e.target.value)}
        />
        <TextField
          id={"input4"}
          type="text"
          className={styles.inputSiffer}
          value={inputVerdier.input4}
          maxLength={1}
          label={"pinkode siffer 4"}
          hideLabel
          onChange={(e) => håndterInputEndring("input4", e.target.value)}
        />
        <TextField
          id={"input5"}
          type="text"
          className={styles.inputSiffer}
          value={inputVerdier.input5}
          maxLength={1}
          label={"pinkode siffer 5"}
          hideLabel
          onChange={(e) => håndterInputEndring("input5", e.target.value)}
        />
      </HStack>
      <Button
        variant={"secondary"}
        onClick={() => {
          håndterPinkode();
          router.push("deltaker/sporsmal");
        }}
      >
        Bli med!
      </Button>
    </>
  );
}
