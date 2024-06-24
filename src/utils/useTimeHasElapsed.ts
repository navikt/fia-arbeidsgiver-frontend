import React from "react";

export default function useTimeHasElapsed(time: number) {
  const [hasElapsed, setHasElapsed] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setHasElapsed(true);
    }, time);

    return () => clearTimeout(timeout);
  });

  return hasElapsed;
}
