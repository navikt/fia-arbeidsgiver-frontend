import React from "react";

export default function VertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
