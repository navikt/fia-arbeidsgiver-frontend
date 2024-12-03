export type planStatusType = "PÅGÅR" | "FULLFØRT" | "AVBRUTT" | "PLANLAGT";

export type planUndertemaType = {
	id: number,
	navn: string,
	målsetning: string,
	inkludert: boolean,
	status?: planStatusType,
	startDato?: Date,
	sluttDato?: Date
};

export type planTemaType = {
	id: number,
	navn: "Partssamarbeid" | "Sykefraværsarbeid" | "Arbeidsmiljø",
	inkludert: boolean,
	undertemaer: planUndertemaType[]
};

export type planType = {
	id: string,
	sistEndret: Date,
	temaer: planTemaType[]
};