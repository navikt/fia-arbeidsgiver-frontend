import framdriftStyles from "./framdrift.module.css";
import React from "react";

export function Framdrift({
  spørsmålnummer,
  totaltAntallSpørsmål,
}: {
  spørsmålnummer: number;
  totaltAntallSpørsmål: number;
}) {
  const framdriftDivs = new Array(totaltAntallSpørsmål).fill(false);
  framdriftDivs[spørsmålnummer - 1] = true;

  return (
    <>
      <span className={framdriftStyles.visuallyHidden}>
        Spørsmål {spørsmålnummer} av {totaltAntallSpørsmål}
      </span>
      <ol className={framdriftStyles.framdrift}>
        {framdriftDivs.map((erAktivt, index) => (
          <li
            key={index}
            className={`${framdriftStyles.framdriftStandard} ${erAktivt ? framdriftStyles.ferdig : framdriftStyles.tom}`}
          />
        ))}
      </ol>
    </>
  );
}
