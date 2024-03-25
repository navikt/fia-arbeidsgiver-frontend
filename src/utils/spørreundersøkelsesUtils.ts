import { Tema } from "@/app/_types/tema";
import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";

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

export function paramTilTema(temaId: string) {
  switch (decodeURI(temaId)) {
    case "UTVIKLE_PARTSSAMARBEID":
      return Tema.UTVIKLE_PARTSSAMARBEID;
    case "REDUSERE_SYKEFRAVÆR":
      return Tema.REDUSERE_SYKEFRAVÆR;
    default:
      throw new Error(`Kunne ikke lese temaId: ${temaId}`);
  }
}

export function temaTilURL(tema: Tema) {
  switch (tema) {
    case Tema.UTVIKLE_PARTSSAMARBEID:
      return encodeURI("UTVIKLE_PARTSSAMARBEID");
    case Tema.REDUSERE_SYKEFRAVÆR:
      return encodeURI("REDUSERE_SYKEFRAVÆR");
    default:
      throw new Error(`Ugyldig tema: ${tema}`);
  }
}

export function urlNeste(spørsmålOgSvar: SpørsmålsoversiktDto): string {
  if (!spørsmålOgSvar) {
    throw new Error("Spørsmål mangler");
  }

  if (spørsmålOgSvar.nesteSpørsmål === null) {
    return `../ferdig`;
  }

  return `../${temaTilURL(spørsmålOgSvar.nesteSpørsmål.tema)}/${
    spørsmålOgSvar.nesteSpørsmål.spørsmålId
  }`;
}
export function urlNesteVert(spørsmålOgSvar: SpørsmålsoversiktDto): string {
  if (!spørsmålOgSvar) {
    throw new Error("Spørsmål mangler");
  }

  if (spørsmålOgSvar.nesteSpørsmål === null) {
    return `../../ferdig`;
  }

  return `../${temaTilURL(spørsmålOgSvar.nesteSpørsmål.tema)}/${
    spørsmålOgSvar.nesteSpørsmål.spørsmålId
  }`;
}

export function urlTilbake(
  spørsmålOgSvar: SpørsmålsoversiktDto,
): string | null {
  if (!spørsmålOgSvar) {
    throw new Error("Spørsmål mangler");
  }

  if (spørsmålOgSvar.forrigeSpørsmål === null) {
    return null;
  }

  return `../${temaTilURL(spørsmålOgSvar.forrigeSpørsmål.tema)}/${
    spørsmålOgSvar.forrigeSpørsmål.spørsmålId
  }`;
}
