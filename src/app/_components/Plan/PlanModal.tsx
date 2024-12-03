import { Heading, Modal } from "@navikt/ds-react";
import React from "react";
import { planType } from "@/app/_types/Plantyper";
import PlanGraf from "./PlanGraf";
import { useSpørreundersøkelseInfo } from "@/app/_api_hooks/vert/useSpørreundersøkelseInfo";
import planGrafStyles from "./plangraf.module.css"
import InnholdsAccordion from "./Innholdsaccordion";

export default function PlanModal({
	spørreundersøkelseId,
	åpen,
	onClose,
}: {
	spørreundersøkelseId: string;
	åpen: boolean;
	onClose: () => void;
}) {
	const spørreundersøkelseInfo = useSpørreundersøkelseInfo(spørreundersøkelseId);

	return (
		<Modal
			open={åpen}
			onClose={onClose}
			header={{ heading: "Samarbeidsplan" }}
			closeOnBackdropClick={true}
			width="80rem"
		>
			<Modal.Body className={planGrafStyles.modalBody}>
				<Planvisning plan={spørreundersøkelseInfo.data?.plan} />
			</Modal.Body>
		</Modal>
	);
}

function Planvisning({ plan }: { plan?: planType }) {
	if (!plan?.temaer) {
		return null;
	}

	const [start, slutt] = plan.temaer.reduce<(Date | undefined)[]>((prev, curr) => {
		const retval = [...prev];

		if (curr.inkludert) {
			for (let index = 0; index < curr.undertemaer.length; index++) {
				const element = curr.undertemaer[index];

				if (element.inkludert) {
					if (retval[0] === undefined || (element.startDato && element.startDato < retval[0])) {
						retval[0] = element.startDato;
					}
					if (retval[1] === undefined || (element.sluttDato && element.sluttDato > retval[1])) {
						retval[1] = element.sluttDato;
					}
				}
			}
		}

		return retval;

	}, [undefined, undefined]);

	return (
		plan.temaer.map((tema) => tema.inkludert ? (
			<div className={planGrafStyles.planTemaSeksjon} key={tema.id}>
				<Heading
					level="2"
					size="small"
					className={planGrafStyles.grafHeader}
				>
					{tema.navn}
				</Heading>
				<div className={planGrafStyles.planTimelineWrapper}>
					<PlanGraf undertemaer={tema.undertemaer} start={start} slutt={slutt} harEksterntGrid />
				</div>
				<InnholdsAccordion tema={tema} />
				<br />
			</div>
		) : null)
	)
}