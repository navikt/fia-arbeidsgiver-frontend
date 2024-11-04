"use client";

import React from "react";
import {
	Page,
	Loader
} from "@navikt/ds-react";
import { useSpørreundersøkelseInfo } from "@/app/_api_hooks/vert/useSpørreundersøkelseInfo";
import { EvalueringStartside } from "./EvalueringStartside";
import { BehovsvurderingStartside } from "./BehovsvurderingStartside";

export default function StartsideInnhold({ params }: { params: { uuid: string } }) {
	const spørreundersøkelseInfo = useSpørreundersøkelseInfo(params.uuid);

	if (spørreundersøkelseInfo.isLoading) {
		return (
			<Page background="bg-subtle">
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
					<Loader variant="inverted" />
				</div>
			</Page>
		);
	}
	if (spørreundersøkelseInfo.data?.type === "Evaluering") {
		return <EvalueringStartside params={params} />;
	}

	if (spørreundersøkelseInfo.data?.type === "Behovsvurdering") {
		return <BehovsvurderingStartside params={params} />;
	}

	//Vis behovsvurdering som default, for å unngå bugs før release av evaluering.
	return <BehovsvurderingStartside params={params} />;
}


