"use client";
import { Button } from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@navikt/aksel-icons";

export default function KomIGangKnapp({
  vertId,
  spørreundersøkelseId,
}: {
  vertId: string;
  spørreundersøkelseId: string;
}) {
  const router = useRouter();
  return (
    <Button
      onClick={() =>
        router.push(
          `../../${spørreundersøkelseId}/vert/${vertId}/oversikt?loginModal=true`,
        )
      }
      icon={<ArrowRightIcon aria-hidden />}
      iconPosition="right"
    >
      Kom i gang
    </Button>
  );
}
