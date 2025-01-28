import framdriftStyles from "./framdrift.module.css";
import React from "react";

export function Framdrift({
  spørsmålnummer,
  totaltAntallSpørsmål,
  temanavn,
}: {
  spørsmålnummer: number;
  totaltAntallSpørsmål: number;
  temanavn: string;
}) {
  const [sisteSpørsmål, setSisteSpørsmål] = React.useState<number>(0);
  const framdriftDivs = new Array(totaltAntallSpørsmål).fill(false);
  framdriftDivs[spørsmålnummer - 1] = true;
  const UUTeller = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (UUTeller.current) {
      if (sisteSpørsmål !== spørsmålnummer) {
        UUTeller.current.focus();
        setSisteSpørsmål(spørsmålnummer);
      }
    }
  }, [spørsmålnummer]);

  return (
    <>
      <span className={framdriftStyles.visuallyHidden} tabIndex={-1} ref={UUTeller}>
        {`Spørsmål ${spørsmålnummer} av ${totaltAntallSpørsmål}`}
      </span>
      <ol aria-hidden className={framdriftStyles.framdrift}>
        {framdriftDivs.map((erAktivt, index) => (
          <li
            aria-hidden
            key={index}
            className={`${framdriftStyles.framdriftStandard} ${fremdriftFargeClassname(temanavn, erAktivt)}`}
          />
        ))}
      </ol>
    </>
  );
}


function fremdriftFargeClassname(temanavn: string, erAktivt: boolean) {
  if (!erAktivt) {
    return framdriftStyles.tom;
  }
  switch (temanavn) {
    case "Partssamarbeid":
      return `${framdriftStyles.ferdig} ${framdriftStyles.blå}`;
    case "Sykefraværsarbeid":
      return `${framdriftStyles.ferdig} ${framdriftStyles.grønn}`;
    case "Arbeidsmiljø":
      return `${framdriftStyles.ferdig} ${framdriftStyles.gul}`;
    default:
      return framdriftStyles.tom;
  }
};