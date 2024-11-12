"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
	BodyShort,
	Button,
	HStack,
	Page,
} from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { ArrowRightIcon } from "@navikt/aksel-icons";

import { VelkommenVirksomhet } from "./VelkommenVirksomhet";
import startsideStyles from "./startside.module.css";
import Mobilpåminnelse from "./Mobilpåminnelse";
import StartsideBoksElement from "./StartsideBoksElement";

export function BehovsvurderingStartside({ params }: { params: { uuid: string } }) {
	const router = useRouter();

	return (
		<Page background="bg-subtle" className={startsideStyles.startside}>
			<PageBlock gutters width="xl" className={startsideStyles.startsidePageBlock}>
				<Mobilpåminnelse />
				<VelkommenVirksomhet spørreundersøkelseId={params.uuid} />
				<Button
					onClick={() =>
						router.push(
							`./vert/introside`,
						)
					}
					icon={<ArrowRightIcon aria-hidden />}
					iconPosition="right"
					className={startsideStyles.startKnapp}
				>
					Start behovsvurdering
				</Button>
				<BodyShort align="center" spacing className={startsideStyles.boksBeskrivelse}>
					Inkluderende arbeidsliv handler om å:
				</BodyShort>
				<HStack gap="4">
					<StartsideBoksElement>
						<b>samarbeide</b> for en mer inkluderende arbeidsplass
					</StartsideBoksElement>
					<StartsideBoksElement>
						jobbe <b>systematisk</b> med sykefraværsarbeid
					</StartsideBoksElement>
					<StartsideBoksElement>
						jobbe <b>forebyggende</b> med arbeidsmiljø
					</StartsideBoksElement>
				</HStack>
			</PageBlock>
		</Page>
	);
}
