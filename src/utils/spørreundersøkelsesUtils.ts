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

export function utledTema(temaId: string) {
  switch (decodeURI(temaId)) {
    case "UTVIKLE_PARTSSAMARBEID":
      return Tema.UTVIKLE_PARTSSAMARBEID;
    case "REDUSERE_SYKEFRAVÆR":
      return Tema.REDUSERE_SYKEFRAVÆR;
    default:
      return Tema.UTVIKLE_PARTSSAMARBEID;
  }
}

export function utledTemaId(tema: Tema) {
  switch (tema) {
    case Tema.UTVIKLE_PARTSSAMARBEID:
      return encodeURI("UTVIKLE_PARTSSAMARBEID");
    case Tema.REDUSERE_SYKEFRAVÆR:
      return encodeURI("REDUSERE_SYKEFRAVÆR");
    default:
      return encodeURI("UTVIKLE_PARTSSAMARBEID");
  }
}
