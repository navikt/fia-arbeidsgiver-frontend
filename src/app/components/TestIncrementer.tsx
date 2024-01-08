"use client";

import React from "react";

export default function TestIncrementer() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>Increment</button>
      <p>Count: {count}</p>
    </div>
  );
}
