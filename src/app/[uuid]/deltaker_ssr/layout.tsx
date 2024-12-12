import Demobanner from "@/app/_components/Demobanner";
import React from "react";

export default function VertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Demobanner />
      {children}
    </main>
  );
}
