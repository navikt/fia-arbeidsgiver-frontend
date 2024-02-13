"use client";

import { useRouter } from "next/navigation";

export default function HomeBody({
  spørreundersøkelseId,
  vertId,
}: {
  spørreundersøkelseId: string;
  vertId: string;
}) {
  const router = useRouter();
  router.push(`/${spørreundersøkelseId}/vert/${vertId}`);
  return <></>;
}
