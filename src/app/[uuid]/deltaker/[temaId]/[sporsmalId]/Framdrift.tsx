import framdriftStyles from "@/app/[uuid]/deltaker/[temaId]/[sporsmalId]/framdrift.module.css";
import React from "react";

export function Framdrift({
  spørsmålnummer,
  totaltAntallSpørsmål,
}: {
  spørsmålnummer: number;
  totaltAntallSpørsmål: number;
}) {
  const framdriftDivs = [];
  const breddeUtenMargin =
    (95 * (window.innerWidth - totaltAntallSpørsmål * 2)) /
    (window.innerWidth * totaltAntallSpørsmål);

  for (let i = 0; i < totaltAntallSpørsmål; i++) {
    framdriftDivs.push(
      <div
        key={i}
        className={`${framdriftStyles.framdriftStandard} ${i < spørsmålnummer ? framdriftStyles.ferdig : framdriftStyles.tom}`}
        style={{
          width: `${breddeUtenMargin}%`,
          marginRight: i + 1 !== totaltAntallSpørsmål ? "2px" : "0px",
        }}
      />,
    );
  }

  return <div className={framdriftStyles.framdrift}>{framdriftDivs}</div>;
}
