"use client";

import { Heading, Loader, Page } from "@navikt/ds-react";
import styles from "./startside.module.css";
import Logininformasjon from "./Logininformasjon";
import Status from "./Status";
import { useSpørreundersøkelse } from "@/app/_api_hooks/sporsmalOgSvar";

export default function StartsideBody({ spørreundersøkelseId, vertId }: {
     spørreundersøkelseId: string; vertId: string
}) {
    const { data, isLoading } = useSpørreundersøkelse(spørreundersøkelseId);

    if (isLoading) {
        return <Loader />
    }

    if (data === undefined) {
        return (
            <Page className={styles.startside}>
                <Heading size="large" level="1"> Ukjent spørreundersøkelse </Heading>
            </Page>
        )
    }

    return (
        <Page className={styles.startside}>
            <Page.Block gutters width="xl" className={styles.sideinnhold}>
                <Logininformasjon />
                <Status spørreundersøkelseId={spørreundersøkelseId} vertId={vertId} />
            </Page.Block>
        </Page>
    );
}
