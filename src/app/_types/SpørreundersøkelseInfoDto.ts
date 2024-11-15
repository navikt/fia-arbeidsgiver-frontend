import { planType } from "./Plantyper";

export type SpørreundersøkelseInfoDto = {
	type: "Behovsvurdering" | "Evaluering",
	virksomhetsnavn: string,
	samarbeidsnavn?: string,
	plan?: planType
};
