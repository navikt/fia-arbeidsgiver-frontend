"use client";

import React from "react";
import CookieHandler from "@/utils/CookieHandler";
import useLocalStorage from "@/utils/useLocalStorage";
import Lastevisning from "../tema/[temaId]/sporsmal/[sporsmalId]/Lastevisning";

export function FerdigInnhold() {
  React.useEffect(() => {
    CookieHandler.setHarSvartAlleSpørsmål();
  });
  const { storedValue: sisteTema } = useLocalStorage<string>("sisteTema");

  return <Lastevisning sisteTema={sisteTema} />;
}
