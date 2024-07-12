import { SpørsmåloversiktDto } from "@/app/_types/SpørsmåloversiktDto";

export function urlNeste(spørsmålOgSvar: SpørsmåloversiktDto): string {
  if (!spørsmålOgSvar) {
    throw new Error("Spørsmål mangler");
  }

  if (spørsmålOgSvar.nesteSpørsmål === null) {
    return `../ferdig`;
  }

  return `../${spørsmålOgSvar.nesteSpørsmål.temaId}/${spørsmålOgSvar.nesteSpørsmål.spørsmålId}`;
}

export function urlTilbake(spørsmålOgSvar: SpørsmåloversiktDto): string | null {
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
