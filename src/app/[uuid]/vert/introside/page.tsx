import type { Metadata } from "next";
import React from "react";
import IntosideInnhold from "./IntrosideInnhold";

export const metadata: Metadata = {
  title: "Velkommen",
};


export default function Introside({ params }: { params: { uuid: string } }) {
  return <IntosideInnhold params={params} />;
}
