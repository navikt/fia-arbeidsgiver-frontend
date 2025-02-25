import type { Metadata } from "next";
import React from "react";
import StartsideInnhold from "./StartsideInnhold";

export const metadata: Metadata = {
  title: "Velkommen",
};


export default async function Startside(props: { params: Promise<{ uuid: string }> }) {
  const params = await props.params;
  return <StartsideInnhold params={params} />;
}
