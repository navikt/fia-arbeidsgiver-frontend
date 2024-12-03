import { Button, ActionMenu } from "@navikt/ds-react";
import React from "react";
import LoginModal from "../LoginModal";
import PlanModal from "../Plan/PlanModal";
import { useSearchParams } from "next/navigation";
import { useSpørreundersøkelseInfo } from "@/app/_api_hooks/vert/useSpørreundersøkelseInfo";
import kartleggingStyles from "../../kartlegging.module.css";
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { SpørreundersøkelseInfoDto } from "@/app/_types/SpørreundersøkelseInfoDto";


export default function ModalSeksjon({ spørreundersøkelseId }: { spørreundersøkelseId: string }) {
	const searchParams = useSearchParams();
	const { data: spørreundersøkelseInfo } = useSpørreundersøkelseInfo(spørreundersøkelseId);

	const loginModal = searchParams.get("loginModal");
	const [QRmodalÅpen, setQRmodalÅpen] = React.useState(loginModal === "true");
	const [skalÅpnePlanEtterQR, setSkalÅpnePlanEtterQR] = React.useState(loginModal === "true");
	const [planModalÅpen, setPlanModalÅpen] = React.useState(false);

	const setQRModalOgÅpnePlanOmNødvendig = (åpen: boolean) => {
		setQRmodalÅpen(åpen);
		if (!åpen && skalÅpnePlanEtterQR && spørreundersøkelseInfo?.type === "Evaluering") {
			setSkalÅpnePlanEtterQR(false);
			setPlanModalÅpen(true);
		}
	}

	return (
		<>
			<LoginModal
				spørreundersøkelseId={spørreundersøkelseId}
				åpen={QRmodalÅpen}
				onClose={() => setQRModalOgÅpnePlanOmNødvendig(false)}
			/>
			<PlanModal spørreundersøkelseId={spørreundersøkelseId} åpen={planModalÅpen} onClose={() => setPlanModalÅpen(false)} />
			<ModalVelger setPlanModalÅpen={setPlanModalÅpen} setQRmodalÅpen={setQRModalOgÅpnePlanOmNødvendig} spørreundersøkelseInfo={spørreundersøkelseInfo} />
		</>
	)
}

function ModalVelger({ setPlanModalÅpen, setQRmodalÅpen, spørreundersøkelseInfo }:
	{ setPlanModalÅpen: (arg0: boolean) => void, setQRmodalÅpen: (arg0: boolean) => void, spørreundersøkelseInfo: SpørreundersøkelseInfoDto | undefined }) {
	const [åpen, setÅpen] = React.useState(false);
	if (spørreundersøkelseInfo?.type === "Evaluering") {
		const Dropdownikon = åpen ? ChevronUpIcon : ChevronDownIcon;
		return (
			<ActionMenu open={åpen} onOpenChange={setÅpen}>
				<ActionMenu.Trigger>
					<Button
						className={kartleggingStyles.knappHvit}
						variant="secondary"
						iconPosition="right"
						icon={<Dropdownikon />}
					>
						Vis
					</Button>
				</ActionMenu.Trigger>
				<ActionMenu.Content>
					<ActionMenu.Item
						onClick={() => setPlanModalÅpen(true)}
					>
						Samarbeidsplan
					</ActionMenu.Item>
					<ActionMenu.Item
						onClick={() => setQRmodalÅpen(true)}
					>
						QR-kode
					</ActionMenu.Item>
				</ActionMenu.Content>
			</ActionMenu>
		);
	}

	return (
		<Button
			variant="secondary"
			onClick={() => setQRmodalÅpen(true)}
			className={kartleggingStyles.knappHvit}
		>
			Vis QR-kode
		</Button>
	);
}