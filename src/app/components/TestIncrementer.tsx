"use client";

import React from "react";
import { Button } from "@navikt/ds-react";

export default function TestIncrementer() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Button onClick={() => setCount((count) => count + 1)}>Increment</Button>
      <p>Count: {count}</p>
    </div>
  );
}
