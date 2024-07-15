import { DeltakerSpørsmålDto } from "@/app/_types/DeltakerSpørsmålDto";

export function urlNeste(spørsmålOgSvar: DeltakerSpørsmålDto): string {
  if (!spørsmålOgSvar) {
    throw new Error("Spørsmål mangler");
  }

  if (spørsmålOgSvar.nesteSpørsmål === null) {
    return `../ferdig`;
  }

  return `../${spørsmålOgSvar.nesteSpørsmål.temaId}/${spørsmålOgSvar.nesteSpørsmål.spørsmålId}`;
}

export function urlTilbake(spørsmålOgSvar: DeltakerSpørsmålDto): string | null {
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
