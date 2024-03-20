import {
  Bleed,
  BodyShort,
  Box,
  Button,
  Heading,
  HStack,
  VStack,
} from "@navikt/ds-react";
import kartleggingStyles from "@/app/kartlegging.module.css";
import vertStyles from "@/app/[uuid]/vert/[vertId]/tema/[temaId]/[sporsmalId]/sporsmalsside.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { finskrivTema } from "@/utils/spørreundersøkelsesUtils";
import { TemaoversiktDto } from "@/app/_types/temaoversiktDto";

export function OversiktBleedVert({
  delnummer,
  temaoversikt,
}: {
  delnummer: number;
  temaoversikt: TemaoversiktDto;
}) {
  const router = useRouter();

  function gåTilFørsteSpørsmålEllerTemaside() {
    // router.push(`./tema/${temaoversikt.temaId}`);

    // TODO: Her blir ikke alt i temaoversikt tatt med videre, hva med spørsmålId osv?
    //  Route til første id i url så route ut av tema?
    // fra https://fia-arbeidsgiver.ekstern.dev.nav.no/b51257c4-16ce-4652-a89f-df8e7c9f7b83/vert/01026117-d8cf-4d35-be94-d971037278e1/tema/UTVIKLE_PARTSSAMARBEID
    // til https://fia-arbeidsgiver.ekstern.dev.nav.no/b51257c4-16ce-4652-a89f-df8e7c9f7b83/vert/01026117-d8cf-4d35-be94-d971037278e1/tema/UTVIKLE_PARTSSAMARBEID/${sporsmalId} ?
    // i dag til https://fia-arbeidsgiver.ekstern.dev.nav.no/b51257c4-16ce-4652-a89f-df8e7c9f7b83/vert/01026117-d8cf-4d35-be94-d971037278e1/tema/UTVIKLE_PARTSSAMARBEID/sporsmal ?
    // Forsvinner i push?

    // vil først til TemaID, så til førsteSpørsmålId.
    router.push(
      `./tema/${temaoversikt.temaId}/${temaoversikt.førsteSpørsmålId}`,
    );
  }

  return (
    temaoversikt && (
      <Bleed marginInline="full" asChild reflectivePadding>
        <Box padding="5" className={kartleggingStyles.bleedKlar}>
          <HStack className={vertStyles.bleedInnhold}>
            <VStack>
              <BodyShort size="medium">Del {delnummer}</BodyShort>
              <Heading size="medium">
                {finskrivTema(temaoversikt.temaId)}
              </Heading>
            </VStack>
            <HStack gap={"4"}>
              <Button
                variant={"secondary"}
                onClick={gåTilFørsteSpørsmålEllerTemaside}
                className={kartleggingStyles.knappHvitBred}
              >
                Start{" "}
                {/* todo -> Håndter fortsett, hvordan se om vi skal fortsette hvor vi slapp?*/}
              </Button>
            </HStack>
          </HStack>
        </Box>
      </Bleed>
    )
  );
}
