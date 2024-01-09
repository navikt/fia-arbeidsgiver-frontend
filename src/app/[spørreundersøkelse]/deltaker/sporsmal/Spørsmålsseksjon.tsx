"use client";

import React from "react";
import { Button } from "@navikt/ds-react";
type Spørsmål = {
  id: string;
  spørsmål: string;
  svaralternativer: Svaralternativ[];
};

type Svaralternativ = {
  id: string;
  tekst: string;
};

export default function Spørsmålsseksjon() {
  const [aktivtSpørsmålindex, setAktivtSpørsmålindex] = React.useState(0);
  const [svar, setSvar] = React.useState({} as Record<string, string>);
  const spørsmål: Spørsmål[] = [
    {
      id: "1",
      spørsmål: "Hvordan har du det?",
      svaralternativer: [
        { id: "1", tekst: "Bra" },
        { id: "2", tekst: "Dårlig" },
      ],
    },
    {
      id: "2",
      spørsmål: "Hvordan har du det?sadfasz<",
      svaralternativer: [
        { id: "1", tekst: "Braegwegw" },
        { id: "2", tekst: "Dårligegrdfsz" },
      ],
    },
    {
      id: "3",
      spørsmål: "Hvordan har du det?44444",
      svaralternativer: [
        { id: "1", tekst: "123" },
        { id: "2", tekst: "321" },
        { id: "3", tekst: "456" },
        { id: "4", tekst: "654" },
      ],
    },
  ];

  return (
    <>
      <Spørsmål
        spørsmål={spørsmål[aktivtSpørsmålindex]}
        velgSvar={(spørsmålid, svaralternativid) =>
          setSvar((gamleSvar) => ({
            ...gamleSvar,
            [spørsmålid]: svaralternativid,
          }))
        }
        valgtSvar={svar[spørsmål[aktivtSpørsmålindex]?.id]}
      />
      <button
        onClick={() =>
          setAktivtSpørsmålindex((aktivtSpørsmålindex + 1) % spørsmål.length)
        }
      >
        DUMMY! neste
      </button>
    </>
  );
}

function Spørsmål({
  spørsmål,
  velgSvar,
  valgtSvar,
}: {
  spørsmål: Spørsmål;
  velgSvar: (spørsmålId: string, svaralternativId: string) => void;
  valgtSvar?: string;
}) {
  return (
    <div>
      <div>{spørsmål.spørsmål}</div>
      {spørsmål.svaralternativer.map((svaralternativ) => (
        <div key={svaralternativ.id}>
          <Button
            variant={valgtSvar === svaralternativ.id ? "primary" : "secondary"}
            size="small"
            id={svaralternativ.id}
            onClick={() => velgSvar(spørsmål.id, svaralternativ.id)}
          >
            {svaralternativ.tekst}
          </Button>
        </div>
      ))}
    </div>
  );
}
