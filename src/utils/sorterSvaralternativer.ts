import { SpørsmålResultatDto } from "@/app/_types/SpørsmålResultatDto";
import { SvarResultatDto } from "@/app/_types/SvarResultatDto";
import React from "react";

const alternativRekkefølgeSett = [
  [
	"Enig",
	"Litt enig",
	"Litt uenig",
	"Uenig",
	"Vet ikke",
  ],
  [
	"Lønnsforhandlinger",
	"HMS",
	"Drift og bemanning",
	"Sykefravær (f.eks. rutiner, tilrettelegging, oppfølging)",
	"Arbeidsmiljø (f.eks. organisering, planlegging)",
	"Personalpolitikk",
	"Velferdsgoder",
	"Annet",
	"Vet ikke",
  ],
  [
	"Svært bra",
	"Bra",
	"Dårlig",
	"Svært dårlig",
	"Vet ikke",
  ]
];

function getRekkefølgeSett(svarListe: SvarResultatDto[]) {
	const svaralternativtekster = svarListe.map(svar => svar.tekst);

	for (const sett of alternativRekkefølgeSett) {
		if (svaralternativtekster.every(svar => sett.includes(svar))) {
			return sett;
		}
	}
}

function getSvaralternativIndex(svar: string, sett: string[]) {
	return sett.indexOf(svar); // Om det ikke er der havner det i starten
}

export function getSortertSvaralternativer(svarListe: SvarResultatDto[]) {
	const sett = getRekkefølgeSett(svarListe);

	if (!sett) {
		return svarListe;
	}

	return svarListe.sort((a, b) => getSvaralternativIndex(a.tekst, sett) - getSvaralternativIndex(b.tekst, sett));
}

export function getSpørsmålMedSorterteSvaralternativer(spørsmål: SpørsmålResultatDto) {
	return {
		...spørsmål,
		svarListe: getSortertSvaralternativer(spørsmål.svarListe),
	};
}

export function useSpørsmålMedSorterteSvaralternativer(spørsmål: SpørsmålResultatDto) {
	return React.useMemo(() => getSpørsmålMedSorterteSvaralternativer(spørsmål), [spørsmål]);
}
