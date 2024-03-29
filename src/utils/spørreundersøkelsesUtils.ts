import { SpørsmålsoversiktDto } from "@/app/_types/spørsmålsoversiktDto";

export function urlNeste(spørsmålOgSvar: SpørsmålsoversiktDto): string {
  if (!spørsmålOgSvar) {
    throw new Error("Spørsmål mangler");
  }

  if (spørsmålOgSvar.nesteSpørsmål === null) {
    return `../ferdig`;
  }

  return `../${spørsmålOgSvar.nesteSpørsmål.temaId}/${spørsmålOgSvar.nesteSpørsmål.spørsmålId}`;
}

export function urlNesteVert(
  spørsmålOgSvar: SpørsmålsoversiktDto,
  gåTilOversikt: boolean = false,
): string {
  if (!spørsmålOgSvar) {
    throw new Error("Spørsmål mangler");
  }

  if (spørsmålOgSvar.nesteSpørsmål === null || gåTilOversikt) {
    return `../../oversikt`;
  }

  return `../${spørsmålOgSvar.nesteSpørsmål.temaId}/${spørsmålOgSvar.nesteSpørsmål.spørsmålId}`;
}

export function urlTilbake(
  spørsmålOgSvar: SpørsmålsoversiktDto,
): string | null {
  if (!spørsmålOgSvar) {
    throw new Error("Spørsmål mangler");
  }

  if (
    spørsmålOgSvar.forrigeSpørsmål === null ||
    spørsmålOgSvar.spørsmålnummer === 1
  ) {
    return null;
  }

  return `../${spørsmålOgSvar.forrigeSpørsmål.temaId}/${spørsmålOgSvar.forrigeSpørsmål.spørsmålId}`;
}
