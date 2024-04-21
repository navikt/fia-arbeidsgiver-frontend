import { SpørsmåloversiktDTO } from "@/app/_types/SpørsmåloversiktDTO";

export function urlNeste(spørsmålOgSvar: SpørsmåloversiktDTO): string {
  if (!spørsmålOgSvar) {
    throw new Error("Spørsmål mangler");
  }

  if (spørsmålOgSvar.nesteSpørsmål === null) {
    return `../ferdig`;
  }

  return `../${spørsmålOgSvar.nesteSpørsmål.temaId}/${spørsmålOgSvar.nesteSpørsmål.spørsmålId}`;
}

export function urlNesteVert(
  spørsmålOgSvar: SpørsmåloversiktDTO,
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

export function urlTilbake(spørsmålOgSvar: SpørsmåloversiktDTO): string | null {
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
