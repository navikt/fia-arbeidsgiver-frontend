"use client";
import { Button } from "@navikt/ds-react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { useTemaoversiktOverEttTema } from "@/app/_api_hooks/vert/useTemaoversiktOverEttTema";

export default function NavigerTilNesteTemaKnapp({
  vertId,
  spørreundersøkelseId,
  temaId,
}: {
  vertId: string;
  spørreundersøkelseId: string;
  temaId: number;
}) {
  const router = useRouter();
  const { data: tema } = useTemaoversiktOverEttTema(
    spørreundersøkelseId,
    vertId,
    temaId,
  );

  if (tema?.nesteTemaId) {
    return (
      <Button
        onClick={() => router.push(`../tema/${tema.nesteTemaId}`)}
        icon={<ArrowRightIcon aria-hidden />}
        variant="secondary"
        iconPosition="right"
      >
        Gå til neste tema
      </Button>
    );
  } else {
    return null;
  }
}
