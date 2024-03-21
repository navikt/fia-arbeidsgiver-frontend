import { Tema } from "@/app/_types/tema";

export function finskrivTema(tema: Tema) {
  switch (tema) {
    case Tema.UTVIKLE_PARTSSAMARBEID:
      return "Utvikle partsamarbeidet i virksomheten";
    case Tema.REDUSERE_SYKEFRAVÆR:
      return "Redusere sykefravær i virksomheten";
    default:
      return `Beskrivelse mangler for: ${tema}`;
  }
}
