"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VideresendTilStart({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const router = useRouter();
  useEffect(() => {
    router.push(`/${spørreundersøkelseId}/vert/${vertId}`);
  });
  return <></>;
}
