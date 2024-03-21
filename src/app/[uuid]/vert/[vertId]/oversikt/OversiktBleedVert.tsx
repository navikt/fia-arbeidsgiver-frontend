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
import { finskrivTema, temaTilURL } from "@/utils/spørreundersøkelsesUtils";
import { TemaoversiktDto } from "@/app/_types/temaoversiktDto";

export function OversiktBleedVert({
  delnummer,
  temaoversikt,
}: {
  delnummer: number;
  temaoversikt: TemaoversiktDto;
}) {
  const router = useRouter();

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
                onClick={() =>
                  router.push(`./tema/${temaTilURL(temaoversikt.temaId)}`)
                }
                className={kartleggingStyles.knappHvitBred}
              >
                Start
              </Button>
            </HStack>
          </HStack>
        </Box>
      </Bleed>
    )
  );
}
