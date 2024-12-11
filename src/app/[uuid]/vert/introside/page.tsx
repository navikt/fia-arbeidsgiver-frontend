import type { Metadata } from "next";
import React from "react";
import IntosideInnhold from "./IntrosideInnhold";

export const metadata: Metadata = {
  title: "Velkommen",
};


export default async function Introside(props: { params: Promise<{ uuid: string }> }) {
  const params = await props.params;
  return <IntosideInnhold params={params} />;
}
