import React from "react";

export default function Dellinje({
  delnummer,
  delnavn,
  punkter,
  tid,
}: {
  delnummer: number;
  delnavn: string;
  punkter: number;
  tid: number;
}) {
  return (
    <div>
      <div>
        <div>Del {delnummer}</div>
        <div>{delnavn}</div>
      </div>
      <div>
        <div>{punkter} punkter</div>
        <div>Beregnet tid: {tid} min</div>
        <button>Start</button>
        <button>Hopp over</button>
      </div>
    </div>
  );
}
