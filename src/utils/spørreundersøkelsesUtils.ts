import { TemaType } from "@/app/_types/temaDTO";

export function finskrivTema(tema: TemaType) {
  switch (tema) {
    case "UTVIKLE_PARTSSAMARBEID":
      return "Utvikle partsamarbeidet i virksomheten";
    case "REDUSERE_SYKEFRAVÆR":
      return "Redusere sykefravær i virksomheten";
    default:
      return `Beskrivelse mangler for: ${tema}`;
  }
}
