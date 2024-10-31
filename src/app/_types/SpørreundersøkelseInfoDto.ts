export type SpørreundersøkelseInfoDto = {
	type: "Behovsvurdering" | "Evaluering",
	virksomhetsnavn: string,
	samarbeidsnavn?: string
};
