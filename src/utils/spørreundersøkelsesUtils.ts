import { DeltakerSpørsmålDto } from "@/app/_types/DeltakerSpørsmålDto";

export function urlNeste(spørsmål: DeltakerSpørsmålDto): string {
  if (!spørsmål) {
    throw new Error("Spørsmål mangler");
  }

  if (spørsmål.nesteSpørsmål === null) {
    return `../../../ferdig`;
  }

  return `../../../tema/${spørsmål.nesteSpørsmål.temaId}/sporsmal/${spørsmål.nesteSpørsmål.spørsmålId}`;
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

  return `../../../tema/${spørsmålOgSvar.forrigeSpørsmål.temaId}/sporsmal/${spørsmålOgSvar.forrigeSpørsmål.spørsmålId}`;
}
