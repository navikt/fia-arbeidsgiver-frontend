import type { Metadata } from "next";
import Dellinje from "./Dellinje";

export const metadata: Metadata = {
  title: "Kartleggingsverktøy",
  description: "Her kan du hoste litt kartlegging da",
};

export default function Oversiktside() {
  const deltakere = 6;
  return (
    <main>
      <div>IA kartleggingsmøte (nummer) med &quot;Virksomhetsnavn&quot;</div>
      <div>[PERSONIKON] {deltakere}</div>
      <div>
        <Dellinje
          delnavn="Partssamarbeid"
          delnummer={1}
          tid={10}
          punkter={10}
        />
        <Dellinje
          delnavn="Systematisk sykefravær"
          delnummer={2}
          tid={15}
          punkter={12}
        />
        <Dellinje
          delnavn="Tilrettelegging og medvirkning"
          delnummer={3}
          tid={5}
          punkter={4}
        />
      </div>
      <button>avslutt</button>
    </main>
  );
}
