import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Screenshottest",
};

export default function Screenshottest() {
  return (
    <div>
      <div style={{ width: 400, height: 400, backgroundColor: "#F0F" }} />
      <div style={{ width: 400, height: 400, backgroundColor: "#0FF" }} />
      <div style={{ width: 400, height: 400, backgroundColor: "#FF0" }} />
    </div>
  );
}
